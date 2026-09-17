import { Postmark } from "../ui";

export default function Privacy() {
  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
          <h1 className="font-mediate text-4xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 font-okine text-lg md:text-xl text-ink/65 max-w-2xl leading-relaxed">
            Dakghor is an independent project dedicated to quiet correspondence. We believe modern communications collect too much and forget too little.
          </p>
        </div>
      </section>

      {/* 01: Indie Philosophy */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              01 Indie Philosophy
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              An independent service with zero interest in your data.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Dakghor is an independent labor of care, not a venture-backed growth machine. We do not sell, rent, monetize, or broker personal information.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              There are no ad networks, third-party tracking scripts, social surveillance pixels, or behavioral profiling cookies on Dakghor. We do not build digital dossiers or monitor who you write to.
            </p>
          </div>
        </div>
      </section>

      {/* 02: Temporary Delivery */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              02 Temporary Delivery
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Temporary transit, not permanent message storage.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              The foundational architectural principle of Dakghor is temporary delivery. When a letter is sealed, it remains in transit until its delivery time arrives.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              When the recipient opens the letter in their Postbox, it is unsealed and displayed for reading. Once closed and filed, the readable letter content is permanently erased from the server. Letters are not preserved in perpetual server databases or scanned for keywords.
            </p>
          </div>
        </div>
      </section>

      {/* 03: Security & Encryption */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              03 Encryption
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Protected in transit and secured at rest.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              All postal communications and letter contents are encrypted in transit using industry-standard TLS encryption. Letter contents are stored in encrypted form while awaiting delivery.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              Account passwords are protected with cryptographic salted hashes. Plaintext passwords are never stored, logged, or accessible to anyone.
            </p>
          </div>
        </div>
      </section>

      {/* 04: Content-Free Metadata Ledger */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              04 Minimal Ledger
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Your correspondence log never contains readable letter text.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Dakghor provides an optional private correspondence log kept on your device. This ledger records minimal postal metadata: the sender's postal address, the date sealed, and the date opened on your device.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              The readable paragraphs of your letters are never retained in this log. Once a letter is closed, it cannot be reconstructed from the log, ensuring your correspondence remains ephemeral.
            </p>
          </div>
        </div>
      </section>

      {/* 05: Postal Address Privacy */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              05 Postal Addresses
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Your address protects your identity.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Your Dakghor address (such as DG-7K4P-92) serves as your private postal drop box. It does not reveal your email address, real-world physical location, phone number, or online activity.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              When someone enters your address into the dispatch field, our address check verifies only that the postal code exists in the registry. It never displays your email address or account history.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Postmark */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Postmark label="POSTAL PRIVACY" date="Encrypted & Ephemeral" className="mx-auto w-32 h-32 md:w-36 md:h-36" />
          <p className="mt-8 font-mediate text-2xl md:text-3xl leading-snug max-w-2xl mx-auto text-ink">
            No trackers. No advertisements. No permanent archives.
          </p>
          <p className="mt-4 font-okine text-xs text-ink/45">
            Last updated September 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
