/**
 * Dakghor Delivery Scheduler
 *
 * Responsibilities:
 * - Continuously evaluate letters in the transit queue against their scheduled arrival time.
 * - When a letter's random transit time has elapsed (12h - 5d), advance it into the recipient's postbox.
 * - Sender receives zero alerts, zero tracking updates, zero ETAs, zero read receipts.
 * - Safe retries and idempotent processing.
 */

import { letterService } from "./letter-service";
import { postboxService } from "./postbox-service";

class DeliveryScheduler {
  private timer: ReturnType<typeof setInterval> | null = null;
  private isProcessing = false;

  /**
   * Run one sweep of the delivery queue.
   */
  public processDueDeliveries(): number {
    if (this.isProcessing) return 0;
    this.isProcessing = true;

    let deliveredCount = 0;
    try {
      const now = Date.now();
      const dueLetters = letterService.getDueLetters(now);

      for (const letter of dueLetters) {
        try {
          postboxService.deliverLetter(letter);
          deliveredCount++;
        } catch {
          // Keep failure details internal; never expose the word "lost"
        }
      }
    } finally {
      this.isProcessing = false;
    }

    return deliveredCount;
  }

  /**
   * Starts background recurring evaluation (e.g. every 60 seconds).
   */
  public start(intervalMs = 60000): void {
    if (this.timer) return;
    this.processDueDeliveries(); // run immediately on startup
    this.timer = setInterval(() => {
      this.processDueDeliveries();
    }, intervalMs);
  }

  /**
   * Stops the scheduler.
   */
  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const deliveryScheduler = new DeliveryScheduler();
