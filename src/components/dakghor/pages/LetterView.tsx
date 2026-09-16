import { Link } from "@tanstack/react-router";
import { mockLetters } from "@/data/mockLetters";
import { Postmark } from "../ui";
import { RouterButton } from "../ui";
import { IconArrowRight } from "../icons";

export default function LetterView({ id }: { id: string }) {
  const letter = mockLetters.find((l) => l.id === id) ?? mockLetters[0];

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[820px] mx-auto">
      <Link
        to="/letters"
        className="inline-flex items-center gap-2 font-okine text-xs uppercase tracking-[0.14em] text-ink/50 hover:text-postbox transition-colors"
      >
        ← Back to My Letters
      </Link>

      <div className="mt-8 overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper animate-unfold">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-ink/15 p-7 md:p-9 bg-cream-dim/40">
          <div className="space-y-4">
            <div>
              <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">From</p>
              <p className="font-mediate text-2xl md:text-3xl text-ink mt-1">{letter.from}</p>
              <p className="font-okine text-xs text-ink/45 mt-1">{letter.fromAddress}</p>
            </div>
            <div>
              <p className="font-okine text-[10px] uppercase tracking-[0.2em] text-ink/45">Sealed</p>
              <p className="font-okine text-sm text-ink/70 mt-1">{letter.sealedDate}</p>
            </div>
          </div>
          <Postmark label="DAKGHOR POST" date={letter.arrivedDate ?? letter.sealedDate} className="w-24 h-24 md:w-28 md:h-28 shrink-0" />
        </div>

        <div className="p-7 md:p-12 paper-ruled">
          {letter.subjectLine && (
            <h1 className="font-mediate text-2xl md:text-3xl text-ink mb-8">{letter.subjectLine}</h1>
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

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-okine text-xs text-ink/40">
          Kept in your archive · {letter.fromAddress}
        </p>
        <RouterButton to="/write" variant="secondary" size="md">
          Reply
          <IconArrowRight className="w-4 h-4" />
        </RouterButton>
      </div>
    </div>
  );
}
