import { RouterButton } from "../ui";
import { Kicker } from "../ui";
import { Postmark } from "../ui";
import { Envelope } from "../ui";
import { Stamp } from "../ui";
import { IconRoute, IconFeather, IconSeal, IconEnvelopeOpen } from "../icons";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-9">
              <h1 className="font-mediate text-[clamp(3.6rem,13vw,6.5rem)] leading-[0.94] tracking-normal text-ink md:text-[clamp(5rem,7.5vw,8rem)]">
                Some letters are worth <span className="italic text-postbox">waiting</span> for.
              </h1>
              <p className="mt-7 max-w-xl font-okine text-base leading-relaxed text-ink/65 md:text-lg">
                Dakghor is a digital postal service for correspondence that deserves time, care, and a proper journey.
              </p>
              <RouterButton to="/create-account" variant="primary" size="lg" className="mt-8">Get your address</RouterButton>
            </div>
            <div className="flex justify-start md:col-span-3 md:justify-end">
              <Postmark label="DAKGHOR POST" date="No rush" className="h-28 w-28 opacity-75 md:h-36 md:w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* NOT A CHAT APP STATEMENT */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <Envelope className="max-w-[360px]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Kicker tone="leaf">Not instant. Not endless. Not disposable.</Kicker>
            <p className="mt-5 font-mediate text-3xl md:text-[2.6rem] leading-[1.15] text-ink">
              A message on Dakghor isn't sent. It's <em className="italic">sealed</em>, carried, and delivered —
              the way correspondence always used to work.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-md">
              There is no typing indicator here. No read receipts, no double ticks, no green dot
              telling you someone is "online." Just a letter, on its way.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS TEASER — horizontal timeline, not cards */}
      <section className="border-b border-ink/10 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20">
          <div className="flex items-end justify-between mb-12 md:mb-16 gap-4 flex-wrap">
            <h2 className="font-mediate text-3xl md:text-5xl">How a letter travels</h2>
            <RouterButton to="/how-it-works" variant="ghost" size="sm" className="!text-cream/70 hover:!text-cream normal-case tracking-normal !text-sm">
              See the full journey →
            </RouterButton>
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-[22px] left-[8%] right-[8%] h-px dash-route-h opacity-30" />
            {[
              { n: "01", label: "Write", icon: IconFeather },
              { n: "02", label: "Seal", icon: IconSeal },
              { n: "03", label: "Travel", icon: IconRoute },
              { n: "04", label: "Arrive", icon: IconEnvelopeOpen },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mediate text-lg text-postbox">{step.n}</span>
                  <span className="h-px flex-1 bg-cream/15" />
                </div>
                <step.icon className="w-7 h-7 text-leaf mb-4" />
                <p className="font-okine uppercase tracking-[0.1em] text-sm text-cream/90">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE BAND */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1000px] px-5 md:px-10 py-20 md:py-28 text-center">
          <p className="font-mediate text-2xl md:text-4xl leading-snug text-ink">
            "We built Dakghor for the sentences that don't survive being typed quickly —
            the ones that need a walk to the postbox first."
          </p>
          <p className="mt-6 font-okine text-[12px] uppercase tracking-[0.2em] text-ink/50">
            From the Dakghor notebook
          </p>
        </div>
      </section>

      {/* ADDRESS PREVIEW / CTA */}
      <section>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <Kicker>Your identity in the network</Kicker>
            <h2 className="mt-5 font-mediate text-3xl md:text-5xl leading-[1.1] text-ink">
              Every account gets a Dakghor address of its own.
            </h2>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-md">
              Share it the way you'd share a home address — not a username. Anyone who has it
              can write to you. No one else can find you by searching.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RouterButton to="/create-account" variant="primary" size="md">
                Create your account
              </RouterButton>
              <RouterButton to="/sign-in" variant="secondary" size="md">
                Sign in
              </RouterButton>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="paper-grain rounded-card border border-ink/15 bg-cream-dim/60 p-8 shadow-paper md:p-10 relative">
              <Stamp className="absolute -top-6 -right-4 rotate-6" tone="leaf" />
              <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">Your Dakghor Address</p>
              <p className="mt-3 font-mediate text-4xl md:text-5xl text-ink tracking-tight">DG-7K4P-92</p>
              <div className="mt-6 h-px bg-ink/10" />
              <p className="mt-4 font-okine text-xs text-ink/45">Issued on account creation · Never expires</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
