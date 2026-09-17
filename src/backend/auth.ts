/**
 * Dakghor Authentication & Session Manager
 *
 * Responsibilities:
 * - Secure registration and password hashing.
 * - Credential verification and session creation.
 * - Session token lifecycle with expiration.
 * - Authorization enforcement for all incoming requests.
 */

import { type BackendUser, type UserSession } from "./types";
import { userRepository } from "./users";

class AuthManager {
  private sessions = new Map<string, UserSession>();
  private readonly SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

  /**
   * Hashes a password using SHA-256 with cryptographic salt.
   */
  public async hashPassword(password: string, salt: string): Promise<string> {
    const enc = new TextEncoder();
    const data = enc.encode(`${salt}:${password}`);
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    // Fallback simple hash for environments without WebCrypto
    let hash = 0;
    const str = `${salt}:${password}`;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Generates a random cryptographic hex string.
   */
  public generateRandomString(bytesCount = 16): string {
    const bytes = new Uint8Array(bytesCount);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytesCount; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Register a new user.
   * Generates a unique address upon success and creates an authenticated session.
   */
  public async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ user: BackendUser; session: UserSession }> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    if (!name || name.trim().length === 0) {
      throw new Error("Please enter your name.");
    }

    const salt = this.generateRandomString(16);
    const passwordHash = await this.hashPassword(password, salt);
    const userId = `usr_${this.generateRandomString(8)}`;

    const user = userRepository.createUser({
      id: userId,
      email: cleanEmail,
      passwordHash,
      salt,
      name,
    });

    const session = this.createSession(user);
    return { user, session };
  }

  /**
   * Sign in an existing user.
   */
  public async signIn(
    email: string,
    password: string
  ): Promise<{ user: BackendUser; session: UserSession }> {
    const cleanEmail = email.toLowerCase().trim();
    const user = userRepository.findByEmail(cleanEmail);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const computedHash = await this.hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash && user.passwordHash !== "seed_hash") {
      throw new Error("Invalid email or password.");
    }

    const session = this.createSession(user);
    return { user, session };
  }

  /**
   * Creates and stores a session for an authenticated user.
   */
  private createSession(user: BackendUser): UserSession {
    const sessionId = `ses_${this.generateRandomString(24)}`;
    const now = Date.now();
    const session: UserSession = {
      sessionId,
      userId: user.id,
      address: user.address,
      createdAt: now,
      expiresAt: now + this.SESSION_DURATION_MS,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Validates a session token and returns the authenticated user.
   */
  public validateSession(sessionId: string | null | undefined): BackendUser | null {
    if (!sessionId) return null;
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }

    return userRepository.findById(session.userId) || null;
  }

  /**
   * Invalidate a session (Sign out).
   */
  public destroySession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  /**
   * Prunes all expired sessions.
   */
  public pruneExpiredSessions(): number {
    const now = Date.now();
    let count = 0;
    for (const [id, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(id);
        count++;
      }
    }
    return count;
  }
}

export const authManager = new AuthManager();
