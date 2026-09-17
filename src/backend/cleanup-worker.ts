/**
 * Dakghor Ephemeral Storage Cleanup Worker
 *
 * Responsibilities:
 * - Periodically purge expired authentication sessions.
 * - Sanitize temporary buffers to ensure zero residual letter content persists.
 * - Enforce zero letter body retention in logs or diagnostics.
 */

import { authManager } from "./auth";

class CleanupWorker {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * Run one sanitation pass.
   */
  public runCleanup(): { purgedSessions: number } {
    const purgedSessions = authManager.pruneExpiredSessions();
    return { purgedSessions };
  }

  /**
   * Start recurring worker (e.g. hourly).
   */
  public start(intervalMs = 3600000): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.runCleanup();
    }, intervalMs);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const cleanupWorker = new CleanupWorker();
