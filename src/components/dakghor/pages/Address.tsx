import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Postmark, Button } from "../ui";
import { IconCopy, IconCheck, IconEnvelope, IconArchive } from "../icons";
import { useAccount, useDemoSession } from "@/lib/demo-auth";
import { useCorrespondenceLog } from "@/lib/letters-store";

export default function Address() {
  const isAuth = useDemoSession();
  const account = useAccount();
  const log = useCorrespondenceLog();
  const [copied, setCopied] = useState(false);

  if (!isAuth || !account) {
    return (
      <div className="px-5 md:px-12 py-16 md:py-24 max-w-[600px] mx-auto text-center">
        <h1 className="mt-4 font-mediate text-3xl md:text-4xl text-ink">Sign in to view your address</h1>
        <p className="mt-4 font-okine text-sm text-ink/60 leading-relaxed">
          Dakghor postal addresses are assigned to registered accounts only. Public visitors do not receive a personal postal identity.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/sign-in">
            <Button variant="primary">Sign In</Button>
          </Link>
          <Link to="/create-account">
            <Button variant="secondary">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const copy = () => {
    navigator.clipboard?.writeText(account.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1000px] mx-auto">
      <h1 className="mt-1 font-mediate text-4xl md:text-5xl text-ink">My Address</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        This is how people write to you on Dakghor. Share it the way you'd share a home address.
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
          <p className="mt-4 font-mediate text-5xl md:text-6xl text-ink tracking-tight font-semibold">
            {account.address}
          </p>
          <button
            onClick={copy}
            className="mt-8 inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.12em] text-ink border border-ink/40 rounded-[var(--radius-btn)] px-5 py-3 hover:border-postbox hover:text-postbox transition-colors bg-paper shadow-paper"
          >
            {copied ? <IconCheck className="w-3.5 h-3.5 text-leaf-dark" /> : <IconCopy className="w-3.5 h-3.5" />}
            {copied ? "Copied to clipboard" : "Copy address"}
          </button>

          <div className="mt-10 pt-6 border-t border-ink/10 grid grid-cols-2 gap-6">
            <div>
              <p className="font-mediate text-2xl text-ink">{log.length}</p>
              <p className="font-okine text-[11px] uppercase tracking-[0.14em] text-ink/45 mt-1">Letters logged</p>
            </div>
            <div>
              <p className="font-mediate text-2xl text-ink">{account.createdAt}</p>
              <p className="font-okine text-[11px] uppercase tracking-[0.14em] text-ink/45 mt-1">Address issued</p>
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
              There is no public directory or username search on Dakghor. The only way to receive correspondence is to give someone your address directly.
            </p>
          </div>
          <div className="rounded-card border border-ink/10 bg-paper p-6 shadow-paper">
            <IconArchive className="w-5 h-5 text-leaf-dark mb-3" />
            <h3 className="font-okine text-sm uppercase tracking-[0.1em] text-ink mb-2">
              It never changes
            </h3>
            <p className="font-okine text-sm text-ink/55 leading-relaxed">
              Your address is permanent for the life of your account. Old correspondents can always find their way back to your Postbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
