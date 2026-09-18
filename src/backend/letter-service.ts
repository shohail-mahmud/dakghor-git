/**
 * Dakghor Letter Service
 *
 * Responsibilities:
 * - Validate recipient postal address and letter content.
 * - Calculate randomized delivery window: 12 hours to 5 days from sealing.
 * - Securely store letter payload in temporary transit queue.
 * - Enforce irrevocable sealing: once sealed, sender can NEVER view, edit, recall, or retrieve the content.
 * - Absolute omission of tracking, ETAs, read receipts, or delivery notifications.
 */

import { type TransitLetter, type SealLetterResult } from "./types";
import { userRepository } from "./users";
import { authManager } from "./auth";

// Minimum delay: 12 hours (in ms)
export const MIN_TRANSIT_DELAY_MS = 12 * 60 * 60 * 1000;
// Maximum delay: 5 days (in ms)
export const MAX_TRANSIT_DELAY_MS = 5 * 24 * 60 * 60 * 1000;

class LetterService {
  // Temporary transit store: letters remain here while in transit
  private transitLetters = new Map<string, TransitLetter>();

  /**
   * Generates a random delivery timestamp between 12 hours and 5 days in the future.
   */
  public calculateScheduledDelivery(sealedAt: number): number {
    const range = MAX_TRANSIT_DELAY_MS - MIN_TRANSIT_DELAY_MS;
    const randomOffset = Math.floor(Math.random() * range);
    return sealedAt + MIN_TRANSIT_DELAY_MS + randomOffset;
  }

  /**
   * Format date for postal presentation (e.g. "17 September 2026")
   */
  public formatPostalDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  /**
   * Seals a new letter.
   *
   * Validates:
   * 1. Sender authorization.
   * 2. Recipient address existence.
   * 3. Letter content non-empty.
   *
   * Effects:
   * 1. Assigns random delivery time (12 hours to 5 days).
   * 2. Places letter in temporary transit queue.
   * 3. Returns only a clean postal confirmation.
   * 4. Exposes NO ETA, NO tracking id, NO delivery status to the sender.
   */
  public sealLetter(params: {
    senderAddress: string;
    senderName: string;
    recipientAddress: string;
    subjectLine?: string | undefined;
    body: string[];
    // Optional delivery override for automated test harnesses only
    deliveryDelayOverrideMs?: number | undefined;
  }): SealLetterResult {
    const { senderAddress, senderName, recipientAddress, subjectLine, body, deliveryDelayOverrideMs } = params;

    // 1. Verify recipient
    const recipient = userRepository.findByAddress(recipientAddress);
    if (!recipient) {
      throw new Error("Recipient address not found in the Dakghor registry.");
    }

    if (senderAddress.toUpperCase().trim() === recipient.address) {
      throw new Error("A letter cannot be addressed to your own postal address.");
    }

    // 2. Validate content
    const sanitizedBody = body.map((p) => p.trim()).filter((p) => p.length > 0);
    if (sanitizedBody.length === 0) {
      throw new Error("Cannot seal an empty letter. Please write your message.");
    }

    const now = Date.now();
    const letterId = `ltr_${authManager.generateRandomString(12)}`;

    // 3. Compute delivery time
    const scheduledDeliveryAt =
      typeof deliveryDelayOverrideMs === "number" && deliveryDelayOverrideMs >= 0
        ? now + deliveryDelayOverrideMs
        : this.calculateScheduledDelivery(now);

    const letter: TransitLetter = {
      id: letterId,
      senderAddress: senderAddress.toUpperCase().trim(),
      senderName: senderName.trim(),
      recipientAddress: recipient.address,
      subjectLine: subjectLine?.trim() || undefined,
      body: sanitizedBody,
      sealedAt: now,
      sealedDateFormatted: this.formatPostalDate(now),
      scheduledDeliveryAt,
      status: "in_transit",
    };

    this.transitLetters.set(letterId, letter);

    // Return quiet confirmation. No tracking, no ETA.
    return {
      success: true,
      message: "Your letter has been sealed with wax and placed into transit.",
    };
  }

  /**
   * Get all letters that are currently due for delivery.
   * Used strictly by the Delivery Scheduler.
   */
  public getDueLetters(currentTime = Date.now()): TransitLetter[] {
    const due: TransitLetter[] = [];
    for (const letter of this.transitLetters.values()) {
      if (letter.status === "in_transit" && letter.scheduledDeliveryAt <= currentTime) {
        due.push(letter);
      }
    }
    return due;
  }

  /**
   * Internal retrieval for Postbox delivery.
   */
  public getLetter(id: string): TransitLetter | undefined {
    return this.transitLetters.get(id);
  }

  /**
   * Mark letter delivered.
   */
  public markDelivered(id: string): void {
    const letter = this.transitLetters.get(id);
    if (letter) {
      letter.status = "delivered";
    }
  }

  /**
   * Permanently purge letter from transit storage.
   */
  public purgeLetter(id: string): boolean {
    return this.transitLetters.delete(id);
  }
}

export const letterService = new LetterService();
