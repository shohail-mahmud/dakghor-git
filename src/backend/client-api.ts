/**
 * Dakghor Client API Layer
 *
 * Bridges the UI components with the Dakghor backend services.
 * Maintains local session state and allows the frontend to interact with
 * real backend validation, random delay scheduling, single-read unsealing,
 * and content-free metadata ledger logging.
 */

import {
  DakghorBackend,
  type BackendUser,
  type PostboxLetterPreview,
  type UnsealedLetterContent,
  type MetadataLogEntry,
  type RecipientVerification,
  type SealLetterResult,
} from "./index";

const ACTIVE_SESSION_KEY = "dakghor.backend.session_id";

export class DakghorClient {
  public static getSessionId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACTIVE_SESSION_KEY);
  }

  public static setSessionId(sessionId: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACTIVE_SESSION_KEY, sessionId);
  }

  public static clearSession(): void {
    if (typeof window === "undefined") return;
    const current = this.getSessionId();
    if (current) {
      DakghorBackend.signOut(current);
    }
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }

  public static async register(
    email: string,
    pass: string,
    name: string
  ): Promise<{ user: BackendUser; address: string }> {
    const { user, session } = await DakghorBackend.register(email, pass, name);
    this.setSessionId(session.sessionId);
    return { user, address: user.address };
  }

  public static async signIn(
    email: string,
    pass: string
  ): Promise<{ user: BackendUser; address: string }> {
    const { user, session } = await DakghorBackend.signIn(email, pass);
    this.setSessionId(session.sessionId);
    return { user, address: user.address };
  }

  public static getCurrentUser(): BackendUser | null {
    const sid = this.getSessionId();
    if (!sid) return null;
    return DakghorBackend.verifySession(sid);
  }

  public static verifyRecipient(address: string): RecipientVerification {
    return DakghorBackend.verifyRecipient(address);
  }

  public static sealLetter(params: {
    recipientAddress: string;
    subjectLine?: string | undefined;
    body: string[];
  }): SealLetterResult {
    const sid = this.getSessionId();
    if (!sid) {
      throw new Error("You must be signed in with your Dakghor address to seal a letter.");
    }
    return DakghorBackend.sealLetter({
      senderSessionId: sid,
      recipientAddress: params.recipientAddress,
      subjectLine: params.subjectLine,
      body: params.body,
    });
  }

  public static getWaitingLetters(): PostboxLetterPreview[] {
    const sid = this.getSessionId();
    if (!sid) return [];
    try {
      return DakghorBackend.getWaitingLetters(sid);
    } catch {
      return [];
    }
  }

  public static openLetter(letterId: string): UnsealedLetterContent {
    const sid = this.getSessionId();
    if (!sid) {
      throw new Error("You must be signed in to open letters.");
    }
    return DakghorBackend.openLetter(letterId, sid);
  }

  public static getMetadataLog(): MetadataLogEntry[] {
    const sid = this.getSessionId();
    if (!sid) return [];
    try {
      return DakghorBackend.getMetadataLog(sid);
    } catch {
      return [];
    }
  }

  public static clearMetadataLog(): void {
    const sid = this.getSessionId();
    if (!sid) return;
    DakghorBackend.clearMetadataLog(sid);
  }
}
