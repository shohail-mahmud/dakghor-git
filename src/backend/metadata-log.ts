/**
 * Dakghor Minimal Metadata Log Service
 *
 * Responsibilities:
 * - Maintain optional, private, content-free records on behalf of users.
 * - Stores ONLY:
 *   1. Sender's Dakghor address
 *   2. Sender's postal display name
 *   3. Date the letter was sealed
 *   4. Date the letter was opened
 * - ABSOLUTE RULE: Never store readable letter content in this log.
 * - Must not allow reopening a letter or act like a conventional chat history.
 */

import { type MetadataLogEntry } from "./types";
import { userRepository } from "./users";

class MetadataLogService {
  // Map of recipientAddress -> MetadataLogEntry[]
  private logsByRecipient = new Map<string, MetadataLogEntry[]>();

  /**
   * Records metadata when a recipient opens an unsealed letter.
   * Only records if the recipient has metadata logging enabled.
   */
  public recordLetterOpened(params: {
    recipientAddress: string;
    letterId: string;
    senderName: string;
    senderAddress: string;
    sealedDate: string;
  }): void {
    const { recipientAddress, letterId, senderName, senderAddress, sealedDate } = params;
    const recipient = userRepository.findByAddress(recipientAddress);

    // If recipient explicitly disabled logging, do not record
    if (recipient && !recipient.metadataLogEnabled) {
      return;
    }

    const todayFormatted = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const entry: MetadataLogEntry = {
      id: letterId,
      from: senderName,
      fromAddress: senderAddress,
      sealedDate,
      openedDate: todayFormatted,
    };

    const existing = this.logsByRecipient.get(recipientAddress.toUpperCase()) || [];
    // Ensure no duplicates
    if (!existing.some((e) => e.id === letterId)) {
      existing.unshift(entry);
      this.logsByRecipient.set(recipientAddress.toUpperCase(), existing);
    }
  }

  /**
   * Retrieves the user's private metadata log.
   * Guaranteed to contain zero readable letter content.
   */
  public getLog(recipientAddress: string): MetadataLogEntry[] {
    return this.logsByRecipient.get(recipientAddress.toUpperCase()) || [];
  }

  /**
   * Allows the recipient to clear their private local log ledger.
   */
  public clearLog(recipientAddress: string): void {
    this.logsByRecipient.delete(recipientAddress.toUpperCase());
  }
}

export const metadataLogService = new MetadataLogService();
