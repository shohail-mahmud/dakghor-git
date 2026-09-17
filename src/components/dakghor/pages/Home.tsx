import { RouterButton, Postmark, Envelope, Stamp } from "../ui";
import { IconRoute, IconFeather, IconSeal, IconEnvelopeOpen } from "../icons";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 pb-7 pt-6 md:px-10 md:pb-10 md:pt-8">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-9">
              <h1 className="font-mediate text-[clamp(3.6rem,13vw,6.5rem)] leading-[0.94] tracking-normal text-ink md:text-[clamp(5rem,7.5vw,8rem)]">
                Some letters are worth <span className="italic text-postbox">waiting</span> for.
              </h1>
              <p className="mt-7 max-w-xl font-okine text-base leading-relaxed text-ink/65 md:text-lg">
                Dakghor is a digital postal service for correspondence that deserves time, care, and a proper journey.
              </p>
              <RouterButton to="/create-account" variant="primary" size="lg" className="mt-8">
                Get your address
              </RouterButton>
            </div>
            <div className="flex justify-start md:col-span-3 md:justify-end">
              <Postmark label="DAKGHOR POST" date="No rush" className="h-28 w-28 opacity-75 md:h-36 md:w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* NOT A CHAT APP STATEMENT */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-7 md:py-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <Envelope className="max-w-[360px]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-mediate text-3xl md:text-[2.6rem] leading-[1.15] text-ink">
              A message on Dakghor isn't sent. It's <em className="italic">sealed</em>, carried, and delivered,
              the way correspondence always used to work.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-md">
              There is no typing indicator here. No read receipts, no double ticks, no green dot
              telling you someone is "online." Just a letter, on its way.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS TEASER */}
      <section className="border-b border-ink/10 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-10 md:py-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-7 md:mb-10">
            <h2 className="font-mediate text-3xl md:text-5xl">How a letter travels</h2>
            <RouterButton to="/how-it-works" variant="ghost" size="sm" className="!text-cream/70 hover:!text-cream normal-case tracking-normal !text-sm">
              See the full journey →
            </RouterButton>
          </div>

          <div className="relative grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4 md:gap-6">
            <div className="hidden md:block absolute top-[22px] left-[8%] right-[8%] h-px dash-route-h opacity-30" />
            {[
              { n: "01", label: "Write", icon: IconFeather },
              { n: "02", label: "Seal", icon: IconSeal },
              { n: "03", label: "Travel", icon: IconRoute },
              { n: "04", label: "Arrive", icon: IconEnvelopeOpen },
            ].map((step) => (
              <div key={step.n} className="relative min-h-24 border-t border-cream/20 pt-3 md:min-h-0 md:border-0 md:pt-0">
                <div className="mb-3 flex items-center gap-3 md:mb-4">
                  <span className="shrink-0 font-mediate text-xl text-postbox md:text-lg">{step.n}</span>
                  <span className="h-px flex-1 bg-cream/20 md:bg-cream/15" />
                </div>
                <div className="flex items-center gap-3 md:block">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-cream/15 bg-cream/5 md:block md:h-auto md:w-auto md:border-0 md:bg-transparent">
                    <step.icon className="h-6 w-6 text-leaf md:mb-4 md:h-7 md:w-7" />
                  </span>
                  <p className="font-okine text-sm uppercase tracking-[0.1em] text-cream/90">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE BAND */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1000px] px-5 py-8 text-center md:px-10 md:py-12">
          <p className="font-mediate text-2xl md:text-4xl leading-snug text-ink">
            "We built Dakghor for the sentences that don't survive being typed quickly,
            the ones that need a walk to the postbox first."
          </p>
          <p className="mt-6 font-okine text-[12px] uppercase tracking-[0.2em] text-ink/50">
            From the Dakghor notebook
          </p>
        </div>
      </section>

      {/* ADDRESS PREVIEW / CTA */}
      <section>
        <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-10 md:py-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <h2 className="font-mediate text-3xl md:text-5xl leading-[1.1] text-ink">
              Every account gets a Dakghor address of its own.
            </h2>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-md">
              Share it the way you'd share a home address, not a username. Anyone who has it
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
              <p className="font-okine text-[11px] uppercase tracking-[0.2em] text-ink/50">Example Dakghor Address</p>
              <p className="mt-3 font-mediate text-4xl md:text-5xl text-ink tracking-tight">DG-XXXX-XX</p>
              <div className="mt-6 h-px bg-ink/10" />
              <p className="mt-4 font-okine text-xs text-ink/45">Sample format · Issued on account creation · Never expires</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
