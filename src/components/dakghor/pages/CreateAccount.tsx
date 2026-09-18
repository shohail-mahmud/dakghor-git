import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Field, Input, Button, Stamp, Postmark } from "../ui";
import { supabase } from "@/integrations/supabase/client";

const sampleExampleAddress = "DG-XXXX-XX";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Please choose a password of at least 8 characters.");
      return;
    }

    setBusy(true);
    const cleanEmail = email.trim();
    const { error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { name: name.trim() },
        emailRedirectTo: `${window.location.origin}/sign-in`,
      },
    });
    setBusy(false);

    if (signUpError) {
      const message = signUpError.message.toLowerCase();
      if (message.includes("already")) {
        setError("An account already exists for that email. Try signing in instead.");
      } else {
        setError(signUpError.message);
      }
      return;
    }

    setPendingEmail(cleanEmail);
  };

  // Awaiting email confirmation
  if (pendingEmail) {
    return (
      <div className="mx-auto max-w-[760px] px-5 py-16 md:py-24">
        <div className="paper-grain rounded-card border border-ink/15 bg-paper p-8 md:p-12 shadow-paper relative overflow-hidden animate-unfold">
          <Postmark
            label="DAKGHOR POST"
            date="Awaiting Confirmation"
            tone="postbox"
            className="absolute -top-10 -right-6 w-28 h-28 md:w-36 md:h-36 opacity-80"
          />
          <h1 className="font-mediate text-3xl md:text-5xl text-ink">Check your email.</h1>
          <p className="mt-4 font-okine text-ink/65 leading-relaxed max-w-xl">
            We've sent a confirmation link to{" "}
            <span className="text-ink font-medium">{pendingEmail}</span>. Click it to activate your
            account, then sign in.
          </p>

          <div className="mt-8 rounded-card border border-ink/20 bg-cream-dim/50 p-6 md:p-8">
            <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">
              Your Dakghor Address
            </p>
            <p className="mt-2 font-okine text-sm text-ink/65 leading-relaxed">
              A permanent postal address has been reserved for your account. You'll see it on your
              My Address page the first time you sign in — it is private until then.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <Link to="/sign-in">
              <Button size="lg" className="w-full sm:w-auto">
                Go to sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-start">
      <div>
        <h1 className="font-mediate text-4xl md:text-5xl text-ink">Create your account</h1>
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
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="Password" hint="At least 8 characters">
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          {error && (
            <p className="rounded-card border border-postbox/30 bg-postbox/5 px-4 py-3 font-okine text-sm text-postbox">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy ? "Creating account…" : "Create account"}
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
