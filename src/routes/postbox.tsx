import { Link } from "@tanstack/react-router";
import { Kicker, RouterButton, Postmark, Button } from "../ui";
import { IconEnvelope, IconFeather } from "../icons";
import { useWaitingLetters, useCorrespondenceLog, resetPostboxLetters } from "@/lib/letters-store";

export default function Postbox() {
  const waitingLetters = useWaitingLetters();
  const log = useCorrespondenceLog();

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1000px] mx-auto">
      <div className="flex items-start justify-between gap-6 flex-wrap mb-10 md:mb-12">
        <div>
          <Kicker>Dakghor Postbox</Kicker>
          <h1 className="mt-3 font-mediate text-4xl md:text-5xl text-ink">
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
              <Link
                key={letter.id}
                to="/letters/$id"
                params={{ id: letter.id }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 py-6 px-2 hover:bg-ink/[0.02] transition-colors rounded-control"
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
                  <span className="inline-flex items-center gap-1.5 font-okine text-xs uppercase tracking-[0.1em] text-ink/75 group-hover:text-postbox font-medium">
                    Open letter →
                  </span>
                </div>
              </Link>
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
              onClick={() => resetPostboxLetters()}
              className="font-okine text-[11px] uppercase tracking-wider text-ink/40 hover:text-postbox underline underline-offset-4"
            >
              Reset demo letters in Postbox
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
