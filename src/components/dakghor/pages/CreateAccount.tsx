import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Field, Input, Button, Kicker, Stamp, Postmark } from "../ui";
import { IconCopy, IconCheck, IconArrowRight } from "../icons";
import { createAccount, type DemoAccount } from "@/lib/demo-auth";

const sampleExampleAddress = "DG-2M8R-41";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdAccount, setCreatedAccount] = useState<DemoAccount | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = createAccount({ name, email });
    setCreatedAccount(account);
  };

  const copyIssuedAddress = () => {
    if (!createdAccount) return;
    navigator.clipboard?.writeText(createdAccount.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  // Onboarding state after account creation
  if (createdAccount) {
    return (
      <div className="mx-auto max-w-[760px] px-5 py-16 md:py-24">
        <div className="paper-grain rounded-card border border-ink/15 bg-paper p-8 md:p-12 shadow-paper relative overflow-hidden animate-unfold">
          <Postmark
            label="DAKGHOR POST"
            date="Account Active"
            tone="postbox"
            className="absolute -top-10 -right-6 w-28 h-28 md:w-36 md:h-36 opacity-80"
          />
          <Kicker tone="postbox">Account Created · Address Issued</Kicker>
          <h1 className="mt-4 font-mediate text-3xl md:text-5xl text-ink">
            Welcome to Dakghor, {createdAccount.name}.
          </h1>
          <p className="mt-3 font-okine text-ink/65 leading-relaxed max-w-xl">
            Your personal Dakghor postal address has been issued. This is the only address through which people can reach you.
          </p>

          <div className="mt-8 rounded-card border border-ink/20 bg-cream-dim/50 p-6 md:p-8">
            <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">
              Your Permanent Dakghor Address
            </p>
            <p className="mt-2 font-mediate text-4xl md:text-5xl text-ink tracking-tight font-semibold">
              {createdAccount.address}
            </p>

            <button
              onClick={copyIssuedAddress}
              className="mt-6 inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.12em] text-ink border border-ink/40 rounded-[var(--radius-btn)] px-5 py-2.5 bg-paper hover:border-postbox hover:text-postbox transition-colors shadow-paper"
            >
              {copied ? <IconCheck className="w-3.5 h-3.5 text-leaf-dark" /> : <IconCopy className="w-3.5 h-3.5" />}
              {copied ? "Copied to clipboard" : "Copy address"}
            </button>
          </div>

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="font-okine text-xs text-ink/55 leading-relaxed">
              Share it the way you'd share a home address. There is no search, no directory, and no follower count. Anyone with this code can write to your Postbox.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <Button size="lg" onClick={() => navigate({ to: "/postbox" })} className="w-full sm:w-auto">
              Enter your Postbox
              <IconArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Pre-account creation: Form & clear example format preview
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-start">
      <div>
        <Kicker>Join Dakghor</Kicker>
        <h1 className="mt-4 font-mediate text-4xl md:text-5xl text-ink">Create your account</h1>
        <p className="mt-3 font-okine text-ink/60 leading-relaxed max-w-sm">
          You will be issued your own permanent Dakghor postal address upon creating your account.
        </p>

        <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
          <Field label="Full name">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="Password" hint="At least 8 characters">
            <Input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          <Button type="submit" size="lg" className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-8 font-okine text-sm text-ink/55">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-postbox hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>

      <div className="md:sticky md:top-28">
        <div className="paper-grain rounded-card border border-ink/15 bg-cream-dim/60 p-8 shadow-paper md:p-10 relative">
          <Stamp className="absolute -top-6 -right-4 rotate-6" tone="postbox" />
          <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">
            Example Address Format
          </p>
          <p className="mt-3 font-mediate text-4xl md:text-5xl text-ink tracking-tight">
            {sampleExampleAddress}
          </p>
          <span className="mt-3 inline-block font-okine text-[11px] uppercase tracking-wide text-ink/45">
            Illustrative sample · Not yet assigned
          </span>
          <div className="mt-8 h-px bg-ink/10" />
          <p className="mt-4 font-okine text-xs text-ink/55 leading-relaxed">
            Personal addresses are unique and generated automatically when your account is registered. Dakghor addresses never expire and cannot be changed.
          </p>
        </div>
      </div>
    </div>
  );
}
