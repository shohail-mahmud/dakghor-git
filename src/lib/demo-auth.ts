import { useSyncExternalStore } from "react";

const DEMO_SESSION_KEY = "dakghor.demo-session";
const DEMO_SESSION_EVENT = "dakghor:demo-session";

export const demoAccount = {
  name: "Shohail",
  email: "demo@dakghor.local",
  password: "dakghor",
  address: "DG-7K4P-92",
} as const;

function getSnapshot() {
  return typeof window !== "undefined" && window.localStorage.getItem(DEMO_SESSION_KEY) === "active";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DEMO_SESSION_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEMO_SESSION_EVENT, callback);
  };
}

export function useDemoSession() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function signInToDemo() {
  window.localStorage.setItem(DEMO_SESSION_KEY, "active");
  window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
}

export function signOutOfDemo() {
  window.localStorage.removeItem(DEMO_SESSION_KEY);
  window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
}