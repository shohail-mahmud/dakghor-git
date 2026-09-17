import { useSyncExternalStore } from "react";
import { initialMockLetters, type MockLetter } from "@/data/mockLetters";

export interface CorrespondenceLogEntry {
  id: string;
  from: string;
  fromAddress: string;
  sealedDate: string;
  openedDate: string;
}

const OPENED_LETTERS_KEY = "dakghor.opened-letter-ids";
const CORRESPONDENCE_LOG_KEY = "dakghor.correspondence-log";
const LETTERS_EVENT = "dakghor:letters-changed";

function getStoredOpenedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(OPENED_LETTERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getLetterById(id: string): MockLetter | undefined {
  return initialMockLetters.find((l) => l.id === id);
}

export function isLetterOpened(id: string): boolean {
  return getStoredOpenedIds().includes(id);
}

export function openLetter(id: string): void {
  if (typeof window === "undefined") return;
  const currentOpened = getStoredOpenedIds();
  if (currentOpened.includes(id)) return;

  const letter = getLetterById(id);
  if (!letter) return;

  const nextOpened = [...currentOpened, id];
  window.localStorage.setItem(OPENED_LETTERS_KEY, JSON.stringify(nextOpened));

  let currentLog: CorrespondenceLogEntry[] = [];
  try {
    const raw = window.localStorage.getItem(CORRESPONDENCE_LOG_KEY);
    currentLog = raw ? JSON.parse(raw) : [];
  } catch {
    currentLog = [];
  }

  const todayStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const entry: CorrespondenceLogEntry = {
    id: letter.id,
    from: letter.from,
    fromAddress: letter.fromAddress,
    sealedDate: letter.sealedDate,
    openedDate: todayStr,
  };

  const nextLog = [entry, ...currentLog];
  window.localStorage.setItem(CORRESPONDENCE_LOG_KEY, JSON.stringify(nextLog));
  window.dispatchEvent(new Event(LETTERS_EVENT));
}

export function clearCorrespondenceLog(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CORRESPONDENCE_LOG_KEY);
  window.dispatchEvent(new Event(LETTERS_EVENT));
}

export function resetPostboxLetters(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(OPENED_LETTERS_KEY);
  window.localStorage.removeItem(CORRESPONDENCE_LOG_KEY);
  window.dispatchEvent(new Event(LETTERS_EVENT));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(LETTERS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LETTERS_EVENT, callback);
  };
}

let cachedOpenedRaw: string | null = null;
let cachedWaitingLetters: MockLetter[] = initialMockLetters;

function getWaitingLettersSnapshot(): MockLetter[] {
  if (typeof window === "undefined") return initialMockLetters;
  const raw = window.localStorage.getItem(OPENED_LETTERS_KEY);
  if (raw === cachedOpenedRaw) {
    return cachedWaitingLetters;
  }
  cachedOpenedRaw = raw;
  const openedSet = new Set(raw ? JSON.parse(raw) : []);
  cachedWaitingLetters = initialMockLetters.filter((letter) => !openedSet.has(letter.id));
  return cachedWaitingLetters;
}

let cachedLogRaw: string | null = null;
let cachedLogEntries: CorrespondenceLogEntry[] = [];

function getLogEntriesSnapshot(): CorrespondenceLogEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CORRESPONDENCE_LOG_KEY);
  if (raw === cachedLogRaw) {
    return cachedLogEntries;
  }
  cachedLogRaw = raw;
  try {
    cachedLogEntries = raw ? JSON.parse(raw) : [];
  } catch {
    cachedLogEntries = [];
  }
  return cachedLogEntries;
}

export function useWaitingLetters(): MockLetter[] {
  return useSyncExternalStore(subscribe, getWaitingLettersSnapshot, () => initialMockLetters);
}

export function useCorrespondenceLog(): CorrespondenceLogEntry[] {
  return useSyncExternalStore(subscribe, getLogEntriesSnapshot, () => []);
}
