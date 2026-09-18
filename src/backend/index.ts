/**
 * Dakghor Postal Backend — Unified Facade
 *
 * Implements the Dakghor Backend Specification:
 * 1. Account creation & unique address assignment (DG-XXXX-XX).
 * 2. Writing & sealing letters with random 12h - 5d delivery delay.
 * 3. Irrevocable sealing (no sender tracking, no ETA, no sent box).
 * 4. Delivery scheduler moving due letters into recipient postboxes.
 * 5. Single-read unsealing in postbox with immediate permanent deletion of letter content from server.
 * 6. Minimal private content-free metadata ledger.
 * 7. Ephemeral cleanup workers ensuring no letter content is retained.
 */

export * from "./types";
export { userRepository, generateDakghorAddress } from "./users";
export { authManager } from "./auth";
export { letterService, MIN_TRANSIT_DELAY_MS, MAX_TRANSIT_DELAY_MS } from "./letter-service";
export { deliveryScheduler } from "./delivery-scheduler";
export { postboxService } from "./postbox-service";
export { metadataLogService } from "./metadata-log";
export { cleanupWorker } from "./cleanup-worker";

import { userRepository } from "./users";
import { authManager } from "./auth";
import { letterService } from "./letter-service";
import { deliveryScheduler } from "./delivery-scheduler";
import { postboxService } from "./postbox-service";
import { metadataLogService } from "./metadata-log";
import { cleanupWorker } from "./cleanup-worker";
import {
  type BackendUser,
  type UserSession,
  type RecipientVerification,
  type SealLetterResult,
  type PostboxLetterPreview,
  type UnsealedLetterContent,
  type MetadataLogEntry,
} from "./types";

// Start background workers if in server environment
if (typeof window === "undefined") {
  deliveryScheduler.start();
  cleanupWorker.start();
}

/**
 * Controller-level API providing high-level business actions with authorization checks.
 */
export const DakghorBackend = {
  // Authentication & Profiles
  async register(
    email: string,
    pass: string,
    name: string
  ): Promise<{ user: BackendUser; session: UserSession }> {
    return authManager.register(email, pass, name);
  },

  async signIn(
    email: string,
    pass: string
  ): Promise<{ user: BackendUser; session: UserSession }> {
    return authManager.signIn(email, pass);
  },

  verifySession(sessionId: string): BackendUser | null {
    return authManager.validateSession(sessionId);
  },

  signOut(sessionId: string): void {
    authManager.destroySession(sessionId);
  },

  verifyRecipient(address: string): RecipientVerification {
    return userRepository.verifyRecipient(address);
  },

  updateMetadataPreference(userId: string, enabled: boolean): boolean {
    return userRepository.updateMetadataLogPreference(userId, enabled);
  },

  // Letters & Sealing
  sealLetter(params: {
    senderSessionId: string;
    recipientAddress: string;
    subjectLine?: string | undefined;
    body: string[];
    deliveryDelayOverrideMs?: number | undefined;
  }): SealLetterResult {
    const sender = authManager.validateSession(params.senderSessionId);
    if (!sender) {
      throw new Error("Unauthorized: you must be signed in with your Dakghor address to seal a letter.");
    }

    return letterService.sealLetter({
      senderAddress: sender.address,
      senderName: sender.name,
      recipientAddress: params.recipientAddress,
      subjectLine: params.subjectLine,
      body: params.body,
      deliveryDelayOverrideMs: params.deliveryDelayOverrideMs,
    });
  },

  // Postbox & Unsealing
  getWaitingLetters(sessionId: string): PostboxLetterPreview[] {
    const user = authManager.validateSession(sessionId);
    if (!user) {
      throw new Error("Unauthorized: invalid session.");
    }
    return postboxService.getWaitingLetters(user.address);
  },

  openLetter(letterId: string, sessionId: string): UnsealedLetterContent {
    const user = authManager.validateSession(sessionId);
    if (!user) {
      throw new Error("Unauthorized: invalid session.");
    }
    return postboxService.openLetter(letterId, user.address);
  },

  // Metadata Ledger
  getMetadataLog(sessionId: string): MetadataLogEntry[] {
    const user = authManager.validateSession(sessionId);
    if (!user) {
      throw new Error("Unauthorized: invalid session.");
    }
    return metadataLogService.getLog(user.address);
  },

  clearMetadataLog(sessionId: string): void {
    const user = authManager.validateSession(sessionId);
    if (!user) {
      throw new Error("Unauthorized: invalid session.");
    }
    metadataLogService.clearLog(user.address);
  },

  // Scheduler manual trigger
  sweepDeliveries(): number {
    return deliveryScheduler.processDueDeliveries();
  },
};
