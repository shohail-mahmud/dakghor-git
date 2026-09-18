import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Field, Input, Button } from "../ui";
import { supabase } from "@/integrations/supabase/client";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);

    if (signInError) {
      const message = signInError.message.toLowerCase();
      if (message.includes("not confirmed")) {
        setError("Please confirm your email first — check your inbox for the Dakghor confirmation link.");
      } else if (message.includes("invalid")) {
        setError("That email and password don't match an account.");
      } else {
        setError(signInError.message);
      }
      return;
    }

    navigate({ to: "/postbox" });
  };

  return (
    <div className="mx-auto max-w-[480px] px-5 py-16 md:py-24">
      <h1 className="font-mediate text-4xl md:text-5xl text-ink">Sign in</h1>
      <p className="mt-3 font-okine text-sm text-ink/60">
        Access your Postbox and correspondence.
      </p>

      <form className="mt-10 space-y-6" onSubmit={handleSignIn}>
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
        <Field label="Password">
          <Input
            type="password"
            autoComplete="current-password"
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
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center font-okine text-xs text-ink/45">
        Your Dakghor address stays private — it is never used to sign in.
      </p>

      <p className="mt-6 text-center font-okine text-sm text-ink/55">
        New to Dakghor?{" "}
        <Link to="/create-account" className="text-postbox hover:underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
