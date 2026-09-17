import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RouterButton, Postmark, Button } from "../ui";
import { IconEnvelope, IconFeather } from "../icons";
import { useWaitingLetters, useCorrespondenceLog, resetPostboxLetters, openLetter } from "@/lib/letters-store";
import { type MockLetter } from "@/data/mockLetters";

export default function Postbox() {
  const waitingLetters = useWaitingLetters();
  const log = useCorrespondenceLog();
  const [activeReadingLetter, setActiveReadingLetter] = useState<MockLetter | null>(null);

  const handleOpenLetter = (letter: MockLetter) => {
    setActiveReadingLetter(letter);
  };

  const handleCloseReading = () => {
    if (activeReadingLetter) {
      openLetter(activeReadingLetter.id);
      setActiveReadingLetter(null);
    }
  };

  // If currently reading a letter opened from Postbox
  if (activeReadingLetter) {
    return (
      <div className="px-5 md:px-12 py-10 md:py-14 max-w-[820px] mx-auto">
        <button
          onClick={handleCloseReading}
          className="inline-flex items-center gap-1.5 font-okine text-xs uppercase tracking-[0.14em] text-ink/60 hover:text-postbox transition-colors cursor-pointer"
        >
          ← Back to Postbox
        </button>

        <div className="mt-8 overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper animate-unfold">
          {/* Envelope Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-ink/15 p-7 md:p-9 bg-cream-dim/40">
            <div className="space-y-4">
              <div>
                <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">From</p>
                <p className="font-mediate text-2xl md:text-3xl text-ink mt-1 font-semibold">
                  {activeReadingLetter.from}
                </p>
                <p className="font-okine text-xs text-ink/50 mt-1">{activeReadingLetter.fromAddress}</p>
              </div>
              <div>
                <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">Sealed</p>
                <p className="font-okine text-sm text-ink/70 mt-1">{activeReadingLetter.sealedDate}</p>
              </div>
            </div>
            <Postmark
              label="DAKGHOR POST"
              date={activeReadingLetter.sealedDate}
              className="w-24 h-24 md:w-28 md:h-28 shrink-0 opacity-80"
            />
          </div>

          {/* Ruled paper reading surface */}
          <div className="p-7 md:p-12 paper-ruled">
            {activeReadingLetter.subjectLine && (
              <h1 className="font-mediate text-2xl md:text-3xl text-ink mb-8 font-medium">
                {activeReadingLetter.subjectLine}
              </h1>
            )}
            <div className="space-y-6">
              {activeReadingLetter.body.map((para, i) => (
                <p key={i} className="font-mediate text-lg md:text-xl leading-[2.05rem] text-ink/90">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="font-okine text-xs text-ink/50 max-w-sm">
            Closing will mark this letter as unsealed and log it in your private correspondence record.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" onClick={handleCloseReading}>
              Close & file letter
            </Button>
            <RouterButton to="/write" variant="primary" size="md" onClick={() => openLetter(activeReadingLetter.id)}>
              <IconFeather className="w-4 h-4" />
              Write a letter
            </RouterButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1000px] mx-auto">
      <div className="flex items-start justify-between gap-6 flex-wrap mb-10 md:mb-12">
        <div>
          <h1 className="mt-1 font-mediate text-4xl md:text-5xl text-ink">
            {waitingLetters.length > 0
              ? `${waitingLetters.length} letter${waitingLetters.length === 1 ? "" : "s"} waiting to be opened`
              : "Your Postbox is quiet"}
          </h1>
          <p className="mt-3 font-okine text-sm md:text-base text-ink/60 max-w-xl leading-relaxed">
            {waitingLetters.length > 0
              ? "Letters wait here until you open them. Opening a letter unseals it, removes it from your Postbox, and notes it in your private local log."
              : "There are no unopened letters waiting for you. Dakghor delivers correspondence at its own deliberate pace."}
          </p>
        </div>
        <RouterButton to="/write" variant="primary" size="md" className="shrink-0">
          <IconFeather className="w-4 h-4" />
          Write a letter
        </RouterButton>
      </div>

      {waitingLetters.length > 0 ? (
        <section>
          <div className="border-t border-ink/10">
            {waitingLetters.map((letter) => (
              <div
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 py-6 px-2 hover:bg-ink/[0.02] transition-colors rounded-control cursor-pointer"
              >
                <div className="flex items-start gap-4 md:gap-5 min-w-0">
                  <div className="w-12 h-12 shrink-0 border border-ink/20 bg-paper rounded-control flex items-center justify-center text-postbox shadow-paper group-hover:border-postbox transition-colors">
                    <IconEnvelope className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="font-mediate text-xl text-ink group-hover:text-postbox transition-colors">
                        {letter.from}
                      </p>
                      <span className="font-okine text-xs text-ink/40">
                        {letter.fromAddress}
                      </span>
                    </div>
                    <p className="font-okine text-sm text-ink/65 mt-1 font-medium">
                      {letter.subjectLine}
                    </p>
                    <p className="font-okine text-xs text-ink/40 mt-1">
                      Sealed {letter.sealedDate}
                    </p>
                  </div>
                </div>

                <div className="sm:self-center shrink-0 pl-16 sm:pl-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLetter(letter);
                    }}
                    className="!text-xs uppercase tracking-[0.1em] font-medium"
                  >
                    Open letter →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="paper-grain rounded-card border border-ink/15 bg-paper/60 p-10 md:p-14 text-center shadow-paper relative">
          <Postmark
            label="DAKGHOR POST"
            date="Postbox Clear"
            tone="ink"
            className="mx-auto w-24 h-24 md:w-28 md:h-28 opacity-40 mb-6"
          />
          <h2 className="font-mediate text-2xl md:text-3xl text-ink">
            No unopened letters
          </h2>
          <p className="mt-3 font-okine text-sm text-ink/60 max-w-md mx-auto leading-relaxed">
            When someone writes to your Dakghor address, their sealed letter will wait here until you choose to open it. Dakghor does not send alerts or push notifications.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <RouterButton to="/write" variant="primary" size="md">
              <IconFeather className="w-4 h-4" />
              Write a letter
            </RouterButton>
            <RouterButton to="/letters" variant="secondary" size="md">
              View local log
            </RouterButton>
          </div>

          {log.length > 0 && (
            <p className="mt-8 font-okine text-xs text-ink/45">
              You have {log.length} correspondence {log.length === 1 ? "entry" : "entries"} recorded in your private local log.
            </p>
          )}

          <div className="mt-10 pt-6 border-t border-ink/10">
            <button
              onClick={() => {
                resetPostboxLetters();
                setActiveReadingLetter(null);
              }}
              className="font-okine text-[11px] uppercase tracking-wider text-ink/40 hover:text-postbox underline underline-offset-4 cursor-pointer"
            >
              Reset demo letters in Postbox
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
