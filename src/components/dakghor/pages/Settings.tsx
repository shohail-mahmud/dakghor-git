import { useNavigate } from "@tanstack/react-router";
import { Kicker, Input, Button } from "../ui";
import { IconUser, IconLock, IconLogout } from "../icons";
import { signOutOfDemo } from "@/lib/demo-auth";

function Row({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-ink/10">
      <div className="flex gap-4">
        <Icon className="w-5 h-5 text-ink/40 mt-0.5 shrink-0" />
        <div>
          <p className="font-okine text-sm uppercase tracking-[0.08em] text-ink">{title}</p>
          <p className="font-okine text-sm text-ink/50 mt-1 max-w-sm">{description}</p>
        </div>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutOfDemo();
    navigate({ to: "/" });
  };

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[720px] mx-auto">
      <h1 className="mt-1 font-mediate text-4xl md:text-5xl text-ink">Settings</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        Just the essentials. Nothing here needs a complicated dashboard.
      </p>

      <div className="mt-10">
        <Row
          icon={IconUser}
          title="Display name"
          description="Shown to correspondents you write to."
          action={<Input defaultValue="Shohail Mahmud" className="w-40 sm:w-48 text-right" />}
        />
        <Row
          icon={IconLock}
          title="Password"
          description="Account credential."
          action={
            <Button variant="secondary" size="sm">
              Change
            </Button>
          }
        />
        <Row
          icon={IconLogout}
          title="Sign out"
          description="Sign out of this session. You will need your address or email to sign back in."
          action={
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          }
        />
      </div>

      <div className="mt-12 rounded-card border border-postbox/30 bg-postbox/5 p-6 shadow-paper">
        <p className="font-okine text-sm uppercase tracking-[0.1em] text-postbox">Delete account</p>
        <p className="mt-2 font-okine text-sm text-ink/55 leading-relaxed max-w-sm">
          This permanently closes your Postbox and releases your Dakghor address.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4 !border-postbox !text-postbox hover:!bg-postbox hover:!text-cream"
          onClick={handleSignOut}
        >
          Delete my account
        </Button>
      </div>
    </div>
  );
}
