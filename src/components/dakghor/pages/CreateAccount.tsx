import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Field, Input } from "../ui";
import { Button } from "../ui";
import { Kicker } from "../ui";
import { Stamp } from "../ui";
import { IconCopy, IconCheck } from "../icons";
import { signInToDemo } from "@/lib/demo-auth";

const exampleAddress = "DG-2M8R-41";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard?.writeText(exampleAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-start">
      <div>
        <Kicker>Join Dakghor</Kicker>
        <h1 className="mt-4 font-mediate text-4xl md:text-5xl text-ink">Create your account</h1>
        <p className="mt-3 font-okine text-ink/60 leading-relaxed max-w-sm">
          You'll be issued a permanent Dakghor address the moment your account is created.
        </p>

        <form
          className="mt-10 space-y-7"
          onSubmit={(e) => {
            e.preventDefault();
            signInToDemo();
            navigate({ to: "/postbox" });
          }}
        >
          <Field label="Full name">
            <Input type="text" placeholder="Your name" required />
          </Field>
          <Field label="Email">
            <Input type="email" placeholder="you@email.com" required />
          </Field>
          <Field label="Password" hint="At least 8 characters">
            <Input type="password" placeholder="••••••••••" required />
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
            Example Dakghor Address
          </p>
          <p className="mt-3 font-mediate text-4xl md:text-5xl text-ink tracking-tight">{exampleAddress}</p>
          <button
            onClick={copyAddress}
            className="mt-6 inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.12em] text-ink border border-ink/40 rounded-[var(--radius-btn)] px-4 py-2.5 hover:border-postbox hover:text-postbox transition-colors"
          >
            {copied ? <IconCheck className="w-3.5 h-3.5 text-leaf-dark" /> : <IconCopy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy address"}
          </button>
          <div className="mt-8 h-px bg-ink/10" />
          <p className="mt-4 font-okine text-xs text-ink/45 leading-relaxed">
            This is an example of the address you'll receive. Share it the way you'd share a
            home address — anyone who has it can write to you.
          </p>
        </div>
      </div>
    </div>
  );
}
