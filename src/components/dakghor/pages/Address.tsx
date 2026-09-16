import { useState } from "react";
import { Kicker } from "../ui";
import { Postmark } from "../ui";
import { IconCopy, IconCheck, IconPin, IconEnvelope, IconArchive } from "../icons";
import { currentAddress, mockLetters } from "@/data/mockLetters";

export default function Address() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(currentAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1000px] mx-auto">
      <Kicker>
        <IconPin className="w-3 h-3" />
        Your postal identity
      </Kicker>
      <h1 className="mt-3 font-mediate text-4xl md:text-5xl text-ink">My Address</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        This is how people find you on Dakghor. Share it the way you'd share a home address.
      </p>

      <div className="mt-10 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7 paper-grain rounded-card border border-ink/15 bg-cream-dim/50 p-8 shadow-paper md:p-12 relative">
          <Postmark
            label="DAKGHOR POST"
            date="Active"
            tone="postbox"
            className="absolute -top-10 -right-6 w-24 h-24 md:w-28 md:h-28"
          />
          <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">
            Your Dakghor Address
          </p>
          <p className="mt-4 font-mediate text-5xl md:text-6xl text-ink tracking-tight">
            {currentAddress}
          </p>
          <button
            onClick={copy}
            className="mt-8 inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.12em] text-ink border border-ink/40 rounded-[var(--radius-btn)] px-5 py-3 hover:border-postbox hover:text-postbox transition-colors"
          >
            {copied ? <IconCheck className="w-3.5 h-3.5 text-leaf-dark" /> : <IconCopy className="w-3.5 h-3.5" />}
            {copied ? "Copied to clipboard" : "Copy address"}
          </button>

          <div className="mt-10 pt-6 border-t border-ink/10 grid grid-cols-2 gap-6">
            <div>
              <p className="font-mediate text-2xl text-ink">{mockLetters.length}</p>
              <p className="font-okine text-[11px] uppercase tracking-[0.14em] text-ink/45 mt-1">Letters received</p>
            </div>
            <div>
              <p className="font-mediate text-2xl text-ink">Since March</p>
              <p className="font-okine text-[11px] uppercase tracking-[0.14em] text-ink/45 mt-1">Address active</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-5">
          <div className="rounded-card border border-ink/10 bg-paper p-6 shadow-paper">
            <IconEnvelope className="w-5 h-5 text-postbox mb-3" />
            <h3 className="font-okine text-sm uppercase tracking-[0.1em] text-ink mb-2">
              Anyone with your address can write
            </h3>
            <p className="font-okine text-sm text-ink/55 leading-relaxed">
              There's no search or discovery on Dakghor. The only way to reach you is to
              already know your address.
            </p>
          </div>
          <div className="rounded-card border border-ink/10 bg-paper p-6 shadow-paper">
            <IconArchive className="w-5 h-5 text-leaf-dark mb-3" />
            <h3 className="font-okine text-sm uppercase tracking-[0.1em] text-ink mb-2">
              It never changes
            </h3>
            <p className="font-okine text-sm text-ink/55 leading-relaxed">
              Your address is permanent for the life of your account, so old correspondents
              can always find their way back to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
