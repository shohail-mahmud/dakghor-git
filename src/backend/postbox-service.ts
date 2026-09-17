/**
 * Dakghor Postbox Service
 *
 * Responsibilities:
 * - Receive delivered letters from the delivery scheduler.
 * - Serve unopened letter previews (sender, date, subject) to verified recipients.
 * - Enforce recipient ownership on unsealing.
 * - Return full letter content EXACTLY ONCE to the authorized recipient.
 * - Instantly remove the letter from the active Postbox upon unsealing.
 * - Permanently delete the readable letter content from the server.
 * - Prevent duplicate opening or retrieval.
 */

import {
  type PostboxLetterPreview,
  type UnsealedLetterContent,
  type TransitLetter,
} from "./types";
import { letterService } from "./letter-service";
import { metadataLogService } from "./metadata-log";

interface DeliveredPostboxItem {
  letter: TransitLetter;
  deliveredAt: number;
}

class PostboxService {
  // Map of recipientAddress -> Map<letterId, DeliveredPostboxItem>
  private postboxes = new Map<string, Map<string, DeliveredPostboxItem>>();

  // Set of letter IDs that were opened and permanently purged
  private openedLetterIds = new Set<string>();

  /**
   * Called by the delivery scheduler when a letter reaches its scheduled arrival time.
   */
  public deliverLetter(letter: TransitLetter): void {
    const addressKey = letter.recipientAddress.toUpperCase();
    if (!this.postboxes.has(addressKey)) {
      this.postboxes.set(addressKey, new Map());
    }

    const box = this.postboxes.get(addressKey)!;
    box.set(letter.id, {
      letter,
      deliveredAt: Date.now(),
    });

    letterService.markDelivered(letter.id);
  }

  /**
   * Returns unopened waiting letter previews for an authorized recipient.
   * Only returns letters that have arrived and have not been unsealed.
   */
  public getWaitingLetters(recipientAddress: string): PostboxLetterPreview[] {
    const addressKey = recipientAddress.toUpperCase();
    const box = this.postboxes.get(addressKey);
    if (!box) return [];

    const previews: PostboxLetterPreview[] = [];
    for (const item of box.values()) {
      previews.push({
        id: item.letter.id,
        from: item.letter.senderName,
        fromAddress: item.letter.senderAddress,
        sealedDate: item.letter.sealedDateFormatted,
        subjectLine: item.letter.subjectLine,
      });
    }

    return previews;
  }

  /**
   * Recipient opens and unseals a letter.
   *
   * Security & Ephemeral Guarantees:
   * 1. Verifies ownership: only recipient can open.
   * 2. Rejection of already-opened letters (prevents duplicate retrieval).
   * 3. Extracts readable contents and ruled paragraphs.
   * 4. Logs content-free metadata if enabled.
   * 5. Immediately deletes letter from the active Postbox.
   * 6. Permanently purges readable letter content from letter service & memory.
   */
  public openLetter(
    letterId: string,
    recipientAddress: string
  ): UnsealedLetterContent {
    const addressKey = recipientAddress.toUpperCase();

    // Check if already opened and destroyed
    if (this.openedLetterIds.has(letterId)) {
      throw new Error("This letter has already been unsealed and cleared from your postbox.");
    }

    const box = this.postboxes.get(addressKey);
    if (!box || !box.has(letterId)) {
      throw new Error("Letter not found in your postbox.");
    }

    const item = box.get(letterId)!;
    const letter = item.letter;

    // Strict recipient ownership check
    if (letter.recipientAddress.toUpperCase() !== addressKey) {
      throw new Error("Unauthorized: this letter is not addressed to your Dakghor address.");
    }

    // 1. Prepare unsealed content for one-time delivery to recipient
    const unsealedContent: UnsealedLetterContent = {
      id: letter.id,
      from: letter.senderName,
      fromAddress: letter.senderAddress,
      sealedDate: letter.sealedDateFormatted,
      subjectLine: letter.subjectLine,
      body: [...letter.body],
    };

    // 2. Record content-free metadata in ledger
    metadataLogService.recordLetterOpened({
      recipientAddress: letter.recipientAddress,
      letterId: letter.id,
      senderName: letter.senderName,
      senderAddress: letter.senderAddress,
      sealedDate: letter.sealedDateFormatted,
    });

    // 3. Mark as opened
    this.openedLetterIds.add(letterId);

    // 4. Remove from active Postbox immediately
    box.delete(letterId);

    // 5. Permanently delete readable letter content from server storage
    letterService.purgeLetter(letterId);

    return unsealedContent;
  }

  /**
   * Helper to seed initial sample letters into a recipient postbox for demo.
   */
  public seedIncomingLetter(letter: TransitLetter): void {
    this.deliverLetter(letter);
  }
}

export const postboxService = new PostboxService();
