/**
 * Dakghor Backend Core Types
 *
 * Core philosophy:
 * - Temporary delivery, not permanent message storage.
 * - Digital postal service, not an instant messaging app.
 * - No chat threads, read receipts, ETAs, tracking, or sent folder.
 */

export interface BackendUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  address: string; // Format: DG-XXXX-XX (e.g. DG-7K4P-92)
  name: string;
  createdAt: number;
  metadataLogEnabled: boolean; // Optional private log preference
}

export interface UserSession {
  sessionId: string;
  userId: string;
  address: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * Recipient verification response
 * Discloses ONLY the minimum required verification confirmation.
 * Never leaks real identity, email, or unnecessary account details.
 */
export interface RecipientVerification {
  valid: boolean;
  address: string;
  displayName?: string; // Optional postal display handle, e.g. "Arif"
}

/**
 * A sealed letter in transit.
 * Once sealed, content is inaccessible to the sender.
 * Scheduled for delivery between 12 hours and 5 days.
 */
export interface TransitLetter {
  id: string;
  senderAddress: string;
  senderName: string;
  recipientAddress: string;
  subjectLine?: string | undefined;
  body: string[]; // Ruled paper paragraphs
  sealedAt: number; // Unix timestamp
  sealedDateFormatted: string; // Display string, e.g. "17 September 2026"
  scheduledDeliveryAt: number; // Unix timestamp: sealedAt + random(12h, 120h)
  status: "in_transit" | "delivered" | "unsealed";
}

/**
 * Letter waiting in the recipient's postbox.
 * Metadata visible before unsealing.
 */
export interface PostboxLetterPreview {
  id: string;
  from: string;
  fromAddress: string;
  sealedDate: string;
  subjectLine?: string | undefined;
}

/**
 * Result of unsealing a letter in the Postbox.
 * The content is returned EXACTLY ONCE to the recipient.
 * After return, the content is permanently purged from server memory.
 */
export interface UnsealedLetterContent {
  id: string;
  from: string;
  fromAddress: string;
  sealedDate: string;
  subjectLine?: string | undefined;
  body: string[];
}

/**
 * Minimal private correspondence log entry.
 * Retains ONLY metadata. NEVER stores readable content.
 */
export interface MetadataLogEntry {
  id: string;
  from: string;
  fromAddress: string;
  sealedDate: string;
  openedDate: string;
}

/**
 * Result returned when a sender seals a letter.
 * Zero tracking, zero ETA, zero delivery status.
 */
export interface SealLetterResult {
  success: boolean;
  message: string; // Postal confirmation, e.g. "Your letter has been sealed and placed into transit."
}
