import { Postmark, RouterButton } from "../ui";

export default function About() {
  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
          <h1 className="font-mediate text-4xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            We didn't set out to build another inbox.
          </h1>
        </div>
      </section>

      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              01 Origin
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Every message we send now arrives before we've finished the thought behind it.
              Dakghor started as a question: what if writing to someone came with a little
              distance built back in?
            </p>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Not distance as in disconnection, but distance as in the kind that makes you choose
              your words, finish your sentence, and let a letter sit in transit for a while
              before it lands. We were tired of conversations that never had a chance to end.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              02 Philosophy
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              A postal address is not a username. It is a place someone can reach you,
              nothing more and nothing less.
            </p>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              There are no public profiles on Dakghor. No follower counts, no feeds, no
              algorithm deciding what you see first. Just an address, a Postbox, and the
              letters that make their way to you.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              We think correspondence deserves its own medium, one built around patience
              rather than immediacy, and around paper rather than bubbles.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24 text-center">
          <Postmark label="EST. DAKGHOR" date="Every letter counted" className="mx-auto w-32 h-32 md:w-36 md:h-36" />
          <p className="mt-8 font-mediate text-2xl md:text-4xl leading-snug max-w-3xl mx-auto text-ink">
            Dakghor (ডাকঘর) means "post office." We kept the name because that's exactly
            what this is, just digital and a little slower on purpose.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-mediate text-3xl md:text-4xl text-ink text-center md:text-left max-w-lg">
            Write something that can afford to take its time.
          </h2>
          <div className="flex gap-3">
            <RouterButton to="/create-account" variant="primary" size="lg">
              Create account
            </RouterButton>
            <RouterButton to="/how-it-works" variant="secondary" size="lg">
              How it works
            </RouterButton>
          </div>
        </div>
      </section>
    </div>
  );
}
