/**
 * Dakghor User Profiles & Postal Address Registry
 *
 * Responsibilities:
 * - Generate unique, collision-proof Dakghor postal addresses (e.g. DG-7K4P-92).
 * - Ensure 1:1 mapping between accounts and postal addresses.
 * - Guarantee an address is never assigned or revealed before account creation succeeds.
 * - Verify recipient existence without leaking private account data.
 */

import { type BackendUser, type RecipientVerification } from "./types";

// Postal address alphabet (unambiguous uppercase alphanumeric characters, avoiding 0, O, 1, I)
const ADDRESS_CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Generates a unique postal address formatted as DG-XXXX-XX.
 * Example: DG-7K4P-92
 */
export function generateDakghorAddress(existingAddresses: Set<string>): string {
  const getRandomChars = (len: number): string => {
    let result = "";
    const bytes = new Uint8Array(len);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
      for (let i = 0; i < len; i++) {
        result += ADDRESS_CHARS[(bytes[i] ?? 0) % ADDRESS_CHARS.length];
      }
    } else {
      for (let i = 0; i < len; i++) {
        result += ADDRESS_CHARS[Math.floor(Math.random() * ADDRESS_CHARS.length)];
      }
    }
    return result;
  };

  let attempts = 0;
  while (attempts < 500) {
    const part1 = getRandomChars(4);
    const part2 = getRandomChars(2);
    const candidate = `DG-${part1}-${part2}`;
    if (!existingAddresses.has(candidate)) {
      return candidate;
    }
    attempts++;
  }

  // Fallback with timestamp suffix if dense
  const timestampSuffix = Date.now().toString(36).slice(-2).toUpperCase();
  return `DG-${getRandomChars(4)}-${timestampSuffix}`;
}

/**
 * In-memory user store for the postal registry.
 * Encapsulated to prevent direct tampering.
 */
class UserRepository {
  private usersById = new Map<string, BackendUser>();
  private usersByEmail = new Map<string, BackendUser>();
  private usersByAddress = new Map<string, BackendUser>();

  constructor() {
    this.seedDefaultRecipients();
  }

  /**
   * Seed well-known demo postal correspondents so users can write letters immediately.
   */
  private seedDefaultRecipients() {
    const seedAccounts = [
      {
        id: "seed-farhana",
        email: "farhana@example.com",
        name: "Farhana Rahman",
        address: "DG-3J9L-28",
      },
      {
        id: "seed-tariq",
        email: "tariq@example.com",
        name: "Tariq Ahmed",
        address: "DG-8M2X-64",
      },
      {
        id: "seed-kazi",
        email: "kazi@example.com",
        name: "Kazi Nazrul",
        address: "DG-4B7C-91",
      },
      {
        id: "seed-default-demo",
        email: "demo@dakghor.local",
        name: "Shohail",
        address: "DG-7K4P-92",
      },
    ];

    for (const acc of seedAccounts) {
      const user: BackendUser = {
        id: acc.id,
        email: acc.email,
        passwordHash: "seed_hash",
        salt: "seed_salt",
        name: acc.name,
        address: acc.address,
        createdAt: Date.now() - 30 * 86400000,
        metadataLogEnabled: true,
      };
      this.usersById.set(user.id, user);
      this.usersByEmail.set(user.email.toLowerCase(), user);
      this.usersByAddress.set(user.address.toUpperCase(), user);
    }
  }

  public findByEmail(email: string): BackendUser | undefined {
    return this.usersByEmail.get(email.toLowerCase().trim());
  }

  public findById(id: string): BackendUser | undefined {
    return this.usersById.get(id);
  }

  public findByAddress(address: string): BackendUser | undefined {
    return this.usersByAddress.get(address.toUpperCase().trim());
  }

  public getAllAddresses(): Set<string> {
    return new Set(this.usersByAddress.keys());
  }

  /**
   * Register a new user and assign a unique postal address.
   * Never assigns or reveals an address before this step succeeds.
   */
  public createUser(userData: {
    id: string;
    email: string;
    passwordHash: string;
    salt: string;
    name: string;
    customAddress?: string;
  }): BackendUser {
    const normalizedEmail = userData.email.toLowerCase().trim();
    if (this.usersByEmail.has(normalizedEmail)) {
      return this.usersByEmail.get(normalizedEmail)!;
    }

    const assignedAddress =
      userData.customAddress && !this.usersByAddress.has(userData.customAddress.toUpperCase())
        ? userData.customAddress.toUpperCase()
        : generateDakghorAddress(this.getAllAddresses());

    const user: BackendUser = {
      id: userData.id,
      email: normalizedEmail,
      passwordHash: userData.passwordHash,
      salt: userData.salt,
      name: userData.name.trim(),
      address: assignedAddress,
      createdAt: Date.now(),
      metadataLogEnabled: true,
    };

    this.usersById.set(user.id, user);
    this.usersByEmail.set(normalizedEmail, user);
    this.usersByAddress.set(assignedAddress, user);

    return user;
  }

  /**
   * Register an address directly into the registry.
   */
  public registerCustomAddress(address: string, name: string, email: string): BackendUser {
    const normAddress = address.toUpperCase().trim();
    const existing = this.usersByAddress.get(normAddress);
    if (existing) return existing;

    const user: BackendUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      email: email.toLowerCase().trim(),
      passwordHash: "demo_hash",
      salt: "demo_salt",
      name: name.trim(),
      address: normAddress,
      createdAt: Date.now(),
      metadataLogEnabled: true,
    };

    this.usersById.set(user.id, user);
    this.usersByEmail.set(user.email, user);
    this.usersByAddress.set(normAddress, user);
    return user;
  }

  /**
   * Verify recipient address existence.
   * Returns only necessary confirmation.
   * Never reveals email, account creation date, or internal system IDs.
   */
  public verifyRecipient(address: string): RecipientVerification {
    const normalized = address.toUpperCase().trim();
    const user = this.usersByAddress.get(normalized);
    if (!user) {
      return {
        valid: false,
        address: normalized,
      };
    }

    return {
      valid: true,
      address: user.address,
      displayName: user.name,
    };
  }

  public updateMetadataLogPreference(userId: string, enabled: boolean): boolean {
    const user = this.usersById.get(userId);
    if (!user) return false;
    user.metadataLogEnabled = enabled;
    return true;
  }
}

export const userRepository = new UserRepository();
