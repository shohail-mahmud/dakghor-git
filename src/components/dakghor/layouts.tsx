import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Archive, Feather, House, LogOut, MapPin, Menu, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, RouterButton } from "./ui";
import { useDemoSession, signOutOfDemo } from "@/lib/demo-auth";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex font-display text-2xl text-ink", dark && "text-cream", className)}
    >
      Dakghor
    </Link>
  );
}

const publicLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/how-it-works" as const, label: "How It Works" },
  { to: "/about" as const, label: "About" },
];


export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const signedIn = useDemoSession();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 shadow-header backdrop-blur-sm">
        <div className="mx-auto grid h-[72px] max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:px-10">
          <Logo className="min-w-0" />
          <nav className="ml-auto hidden items-center gap-9 font-ui text-[12px] uppercase tracking-[0.12em] md:flex">
            {publicLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-control px-2 py-2 transition-colors hover:text-postbox",
                  path === item.to ? "text-postbox font-medium" : "text-ink/75"
                )}
              >
                {item.label}
                {path === item.to && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-px bg-postbox/60" />
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:ml-9 md:flex">
            {signedIn ? (
              <RouterButton to="/postbox" size="sm">
                Open Postbox
              </RouterButton>
            ) : (
              <>
                <RouterButton to="/sign-in" variant="ghost" size="sm">
                  Sign In
                </RouterButton>
                <RouterButton to="/create-account" size="sm">
                  Create Account
                </RouterButton>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 shrink-0 px-0 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {open && (
          <nav className="paper-grain border-t border-ink/10 bg-paper px-5 py-5 shadow-paper md:hidden">
            {publicLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-control px-3 py-3 font-ui text-sm uppercase tracking-[0.1em]",
                  path === item.to ? "bg-postbox/10 text-postbox font-medium" : "text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-ink/10 pt-4">
              {signedIn ? (
                <RouterButton to="/postbox" className="w-full" onClick={() => setOpen(false)}>
                  Open Postbox
                </RouterButton>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <RouterButton to="/sign-in" variant="secondary" onClick={() => setOpen(false)}>
                    Sign In
                  </RouterButton>
                  <RouterButton to="/create-account" onClick={() => setOpen(false)}>
                    Create Account
                  </RouterButton>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer signedIn={signedIn} />
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-ink/40">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="font-ui text-[12px] text-ink/70 transition-colors hover:text-postbox"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ signedIn }: { signedIn: boolean }) {
  return (
    <footer className="border-t border-ink/10 bg-cream-dim/35">
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-12">
        <div className="grid gap-9 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-3 max-w-xs font-ui text-xs leading-relaxed text-ink/55">
              A digital postal service for letters worth waiting for. No read receipts, no typing
              dots, no rush.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <FooterColumn
              title="Navigation"
              links={[
                { to: "/", label: "Home" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/about", label: "About" },
              ]}
            />
            <FooterColumn
              title="Correspondence"
              links={
                signedIn
                  ? [
                      { to: "/postbox", label: "Postbox" },
                      { to: "/write", label: "Write a Letter" },
                      { to: "/address", label: "My Address" },
                    ]
                  : [
                      { to: "/sign-in", label: "Sign In" },
                      { to: "/create-account", label: "Create Account" },
                    ]
              }
            />
            <FooterColumn
              title="Colophon"
              links={[
                { to: "/terms", label: "Terms of Carriage" },
                { to: "/privacy", label: "Privacy" },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[10px] uppercase tracking-[0.22em] text-ink/35">
            Dakghor Post · Delivered in its own time
          </p>
          <p className="font-ui text-[10px] text-ink/35">© 2026 Dakghor</p>
        </div>
      </div>
    </footer>
  );
}

const appLinks = [
  { to: "/postbox" as const, label: "Postbox", short: "Postbox", icon: House },
  { to: "/write" as const, label: "Write Letter", short: "Write", icon: Feather },
  { to: "/address" as const, label: "My Address", short: "Address", icon: MapPin },
  { to: "/letters" as const, label: "My Letters", short: "Letters", icon: Archive },
  { to: "/settings" as const, label: "Settings", short: "Settings", icon: Settings },
];

export function AppLayout() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const isAuth = useDemoSession();

  useEffect(() => {
    // If not authenticated, protect app routes and redirect to sign in
    if (!isAuth) {
      navigate({ to: "/sign-in" });
    }
  }, [isAuth, navigate]);

  const handleSignOut = () => {
    signOutOfDemo();
    navigate({ to: "/" });
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6 text-center">
        <div>
          <Logo />
          <p className="mt-4 font-okine text-sm text-ink/60">Redirecting to sign in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream md:flex">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 flex-col bg-ink text-cream shadow-sidebar md:flex">
        <div className="px-7 pb-10 pt-8">
          <Logo dark />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {appLinks.map((item) => {
            const active = path === item.to || (item.to === "/letters" && path.startsWith("/letters/"));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-nav px-3.5 py-3 font-ui text-[12px] uppercase tracking-[0.08em] transition-colors",
                  active
                    ? "bg-cream/10 text-cream shadow-nav font-medium"
                    : "text-cream/55 hover:bg-cream/5 hover:text-cream"
                )}
              >
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    active ? "text-postbox" : "text-cream/45"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mx-4 border-t border-cream/10 px-4 py-5">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-cream/55 hover:text-cream"
            onClick={handleSignOut}
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-ink px-5 text-cream shadow-header md:hidden">
        <Logo dark />
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 px-0 text-cream/60"
          onClick={handleSignOut}
          aria-label="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Floating Bottom Bar */}
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 overflow-hidden rounded-nav border border-cream/10 bg-ink px-1 text-cream shadow-mobile md:hidden">
        {appLinks.map((item) => {
          const active = path === item.to || (item.to === "/letters" && path.startsWith("/letters/"));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-control py-2.5 font-ui text-[9px] uppercase tracking-[0.03em]",
                active ? "bg-cream/10 text-postbox font-medium" : "text-cream/50"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="max-w-full truncate">{item.short}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
