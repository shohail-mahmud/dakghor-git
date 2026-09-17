import { useSyncExternalStore } from "react";

export interface DemoAccount {
  name: string;
  email: string;
  address: string;
  createdAt: string;
}

const DEMO_SESSION_KEY = "dakghor.demo-session";
const DEMO_USER_KEY = "dakghor.demo-user";
const DEMO_SESSION_EVENT = "dakghor:demo-session";

export const defaultDemoAccount: DemoAccount = {
  name: "Shohail",
  email: "demo@dakghor.local",
  address: "DG-7K4P-92",
  createdAt: "March 2026",
};

export function generateDakghorAddress(): string {
  // Generate a distinct Dakghor postal code (e.g. DG-4K8P-29)
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const part2 = Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `DG-${part1}-${part2}`;
}

export function getCurrentAccount(): DemoAccount | null {
  if (typeof window === "undefined") return null;
  const isSessionActive = window.localStorage.getItem(DEMO_SESSION_KEY) === "active";
  if (!isSessionActive) return null;

  const storedUser = window.localStorage.getItem(DEMO_USER_KEY);
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      // fallback
    }
  }
  return defaultDemoAccount;
}

let cachedSessionRaw: string | null = null;
let cachedUserRaw: string | null = null;
let cachedAccount: DemoAccount | null = null;

function getAccountSnapshot(): DemoAccount | null {
  if (typeof window === "undefined") return null;
  const session = window.localStorage.getItem(DEMO_SESSION_KEY);
  const userRaw = window.localStorage.getItem(DEMO_USER_KEY);

  if (session !== "active") {
    cachedSessionRaw = session;
    cachedUserRaw = userRaw;
    cachedAccount = null;
    return null;
  }

  if (session === cachedSessionRaw && userRaw === cachedUserRaw && cachedAccount !== null) {
    return cachedAccount;
  }

  cachedSessionRaw = session;
  cachedUserRaw = userRaw;

  if (userRaw) {
    try {
      cachedAccount = JSON.parse(userRaw);
      return cachedAccount;
    } catch {}
  }

  cachedAccount = defaultDemoAccount;
  return cachedAccount;
}

function getSessionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_SESSION_KEY) === "active";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(DEMO_SESSION_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEMO_SESSION_EVENT, callback);
  };
}

export function useDemoSession(): boolean {
  return useSyncExternalStore(subscribe, getSessionSnapshot, () => false);
}

export function useAccount(): DemoAccount | null {
  return useSyncExternalStore(subscribe, getAccountSnapshot, () => null);
}

export function createAccount({ name, email }: { name: string; email: string }): DemoAccount {
  const address = generateDakghorAddress();
  const todayStr = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const account: DemoAccount = {
    name: name.trim() || "Correspondent",
    email: email.trim(),
    address,
    createdAt: todayStr,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(account));
    window.localStorage.setItem(DEMO_SESSION_KEY, "active");
    window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
  }

  return account;
}

export function signInToDemo(customIdentifier?: string): DemoAccount {
  let account: DemoAccount = defaultDemoAccount;
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(DEMO_USER_KEY);
    if (stored) {
      try {
        account = JSON.parse(stored);
      } catch {
        account = defaultDemoAccount;
      }
    } else if (customIdentifier && customIdentifier.startsWith("DG-")) {
      account = {
        name: "Demo Correspondent",
        email: "demo@dakghor.local",
        address: customIdentifier.toUpperCase(),
        createdAt: "March 2026",
      };
      window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(account));
    } else {
      account = defaultDemoAccount;
      window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(account));
    }

    window.localStorage.setItem(DEMO_SESSION_KEY, "active");
    window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
  }
  return account;
}

export function signOutOfDemo() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
  }
}
