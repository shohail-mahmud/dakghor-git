import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Postmark, RouterButton } from "../ui";
import { IconFeather, IconCheck } from "../icons";
import { getLetterById, isLetterOpened, openLetter } from "@/lib/letters-store";

export default function LetterView({ id }: { id: string }) {
  const letter = getLetterById(id);
  const wasAlreadyOpenedOnMount = useRef(typeof window !== "undefined" ? isLetterOpened(id) : false);

  useEffect(() => {
    // If not already opened, open and record in local correspondence log now
    if (letter && !wasAlreadyOpenedOnMount.current) {
      openLetter(id);
    }
  }, [id, letter]);

  if (!letter) {
    return (
      <div className="px-5 md:px-12 py-16 max-w-[700px] mx-auto text-center">
        <h1 className="font-mediate text-3xl text-ink">Letter not found</h1>
        <p className="mt-3 font-okine text-sm text-ink/60">
          This correspondence does not exist or has already been cleared.
        </p>
        <div className="mt-6">
          <RouterButton to="/postbox" variant="primary">
            Back to Postbox
          </RouterButton>
        </div>
      </div>
    );
  }

  // If this letter was already opened in a previous session/visit, it cannot be reopened
  if (wasAlreadyOpenedOnMount.current) {
    return (
      <div className="px-5 md:px-12 py-16 md:py-24 max-w-[700px] mx-auto text-center">
        <div className="paper-grain rounded-card border border-ink/15 bg-paper p-8 md:p-12 shadow-paper">
          <div className="mx-auto w-16 h-16 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/50 mb-6">
            <IconCheck className="w-7 h-7" />
          </div>
          <h1 className="font-mediate text-3xl md:text-4xl text-ink">
            This letter has already been opened.
          </h1>
          <p className="mt-4 font-okine text-sm text-ink/60 leading-relaxed max-w-md mx-auto">
            In Dakghor, correspondence does not linger as a reopenable inbox. A minimal note of this letter from <strong className="text-ink font-medium">{letter.from}</strong> (sealed {letter.sealedDate}) has been preserved in your private device log.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <RouterButton to="/postbox" variant="primary">
              Return to Postbox
            </RouterButton>
            <RouterButton to="/letters" variant="secondary">
              View local log
            </RouterButton>
          </div>
        </div>
      </div>
    );
  }

  // First-time reading view: letter is unsealed and displayed
  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[820px] mx-auto">
      <Link
        to="/postbox"
        className="inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.14em] text-ink/60 hover:text-postbox transition-colors"
      >
        ← Back to Postbox
      </Link>

      <div className="mt-8 overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper animate-unfold">
        {/* Envelope / Header card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-ink/15 p-7 md:p-9 bg-cream-dim/40">
          <div className="space-y-4">
            <div>
              <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">From</p>
              <p className="font-mediate text-2xl md:text-3xl text-ink mt-1 font-semibold">{letter.from}</p>
              <p className="font-okine text-xs text-ink/50 mt-1">{letter.fromAddress}</p>
            </div>
            <div>
              <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">Sealed</p>
              <p className="font-okine text-sm text-ink/70 mt-1">{letter.sealedDate}</p>
            </div>
          </div>
          <Postmark
            label="DAKGHOR POST"
            date={letter.sealedDate}
            className="w-24 h-24 md:w-28 md:h-28 shrink-0 opacity-80"
          />
        </div>

        {/* Paper reading surface */}
        <div className="p-7 md:p-12 paper-ruled">
          {letter.subjectLine && (
            <h1 className="font-mediate text-2xl md:text-3xl text-ink mb-8 font-medium">
              {letter.subjectLine}
            </h1>
          )}
          <div className="space-y-6">
            {letter.body.map((para, i) => (
              <p key={i} className="font-mediate text-lg md:text-xl leading-[2.05rem] text-ink/90">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <p className="font-okine text-xs text-ink/50 max-w-sm">
          Unsealed and logged on this device. Once you leave, this letter will be cleared from your Postbox.
        </p>
        <div className="flex items-center gap-3">
          <RouterButton to="/postbox" variant="secondary" size="md">
            Close letter
          </RouterButton>
          <RouterButton to="/write" variant="primary" size="md">
            <IconFeather className="w-4 h-4" />
            Write a letter
          </RouterButton>
        </div>
      </div>
    </div>
  );
}
