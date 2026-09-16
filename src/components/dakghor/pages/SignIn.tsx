import { useNavigate, Link } from "@tanstack/react-router";
import { Field, Input } from "../ui";
import { Button } from "../ui";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[480px] px-5 py-16 md:py-24">
      <p className="font-mediate text-2xl text-ink">Dakghor</p>
      <h1 className="mt-8 font-mediate text-4xl md:text-5xl text-ink">Sign in</h1>

      <form
        className="mt-10 space-y-7"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/postbox" });
        }}
      >
        <Field label="Dakghor address or email">
          <Input type="text" placeholder="DG-7K4P-92 or you@email.com" required />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••••" required />
        </Field>

        <div className="flex items-center justify-end text-sm">
          <button type="button" className="font-okine text-ink/50 hover:text-postbox underline underline-offset-4">
            Forgot password?
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center font-okine text-sm text-ink/55">
        New to Dakghor?{" "}
        <Link to="/create-account" className="text-postbox hover:underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
