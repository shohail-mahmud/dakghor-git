import { Postmark } from "../ui";

export default function Terms() {
  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
          <h1 className="font-mediate text-4xl md:text-7xl leading-[1.02] text-ink max-w-4xl">
            Terms of Service
          </h1>
          <p className="mt-6 font-okine text-lg md:text-xl text-ink/65 max-w-2xl leading-relaxed">
            Dakghor is an intentional postal service built for personal correspondence. By using Dakghor, you agree to these postal principles and guidelines.
          </p>
        </div>
      </section>

      {/* 01: Postal Identity */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              01 Postal Identity
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Your postal address is a private point of contact, not a social username.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Upon completing account registration, Dakghor issues a unique postal address formatted as DG-XXXX-XX. This address belongs strictly to your account and cannot be duplicated. Addresses are never assigned or revealed before account creation succeeds.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              You are responsible for keeping your credentials confidential. You may share your postal address with anyone you wish to invite into correspondence.
            </p>
          </div>
        </div>
      </section>

      {/* 02: The Postal Rule: Once Sealed, It Is Sealed */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              02 The Postal Rule
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Once a letter is sealed, it is sealed. It has left your hands.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              When you compose a letter and press Seal Letter, your correspondence enters the Dakghor postal transit network. Sealing is irrevocable. You cannot view, edit, recall, or retrieve the contents of a sealed letter.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              Dakghor does not maintain a Sent folder or outbox copy for the sender. Just like putting a letter into a physical red letterbox, once it drops through the slot, it belongs to the journey and the recipient.
            </p>
          </div>
        </div>
      </section>

      {/* 03: Randomized Deliberate Transit */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              03 Deliberate Transit
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Letters travel at their own pace, arriving between 12 hours and 5 days.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Dakghor is intentionally not an instant messaging service. Every letter experiences a randomized delivery schedule selected between 12 hours and 5 days from sealing. This delay is an essential feature of the postal service.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              There is no live tracking, estimated time of arrival, delivery status, or read receipt. Senders receive no alerts when a letter arrives. You write, seal, and let time do its work.
            </p>
          </div>
        </div>
      </section>

      {/* 04: Postbox & Single Delivery */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              04 Postbox & Delivery
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Temporary delivery, not permanent message storage.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              When a letter arrives, it waits quietly in the recipient's Postbox. When the recipient opens the letter, ownership is confirmed and the letter is unsealed.
            </p>
            <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-xl">
              Once closed and filed, the letter disappears from the active Postbox, and its readable contents are permanently deleted from server storage. An optional private correspondence log may retain minimal metadata, such as sender address and dates, but never the readable body of the letter.
            </p>
          </div>
        </div>
      </section>

      {/* 05: Respectful Correspondence */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/45 sticky top-28">
              05 Postal Conduct
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-mediate text-2xl md:text-[2.1rem] leading-[1.35] text-ink">
              Dakghor is reserved for thoughtful, human correspondence.
            </h2>
            <p className="mt-8 font-okine text-ink/65 leading-relaxed max-w-xl">
              Commercial spam, bulk advertising, automated dispatch bots, harassment, threats, and illegal material have no home here. We reserve the right to revoke addresses and restrict access to accounts that violate postal trust.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Postmark */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Postmark label="POSTAL SERVICE" date="Care & Solitude" className="mx-auto w-32 h-32 md:w-36 md:h-36" />
          <p className="mt-8 font-mediate text-2xl md:text-3xl leading-snug max-w-2xl mx-auto text-ink">
            A quiet sanctuary for words that matter.
          </p>
          <p className="mt-4 font-okine text-xs text-ink/45">
            Last revised September 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
