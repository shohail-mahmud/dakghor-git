import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Field, Input, Button } from "../ui";
import { signInToDemo } from "@/lib/demo-auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInToDemo(identifier.trim());
    navigate({ to: "/postbox" });
  };

  const handleDemoQuickAccess = () => {
    signInToDemo();
    navigate({ to: "/postbox" });
  };

  return (
    <div className="mx-auto max-w-[480px] px-5 py-16 md:py-24">
      <h1 className="font-mediate text-4xl md:text-5xl text-ink">Sign in</h1>
      <p className="mt-3 font-okine text-sm text-ink/60">
        Access your Postbox and correspondence.
      </p>

      <form className="mt-10 space-y-6" onSubmit={handleSignIn}>
        <Field label="Dakghor address or email">
          <Input
            type="text"
            placeholder="DG-XXXX-XX or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-ink/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-cream px-3 font-okine text-[10px] tracking-wider text-ink/40">
              Demo Access
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full"
          onClick={handleDemoQuickAccess}
        >
          Enter Demo Account
        </Button>
      </form>

      <p className="mt-8 text-center font-okine text-xs text-ink/45">
        Local demo state · No cloud database or credentials sent over network
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
