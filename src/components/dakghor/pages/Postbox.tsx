import { Link } from "@tanstack/react-router";
import { mockLetters } from "@/data/mockLetters";
import { Kicker } from "../ui";
import { RouterButton } from "../ui";
import { IconMailbox, IconRoute, IconEnvelope, IconFeather } from "../icons";
import { cn } from "@/lib/utils";

export default function Postbox() {
  const inTransit = mockLetters.filter((l) => l.status === "in-transit");
  const arrived = mockLetters.filter((l) => l.status !== "in-transit");
  const unreadArrived = arrived.filter((l) => l.status === "arrived");

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1100px] mx-auto">
      <div className="flex items-start justify-between gap-6 flex-wrap mb-10 md:mb-14">
        <div>
          <Kicker>Your Postbox</Kicker>
          <h1 className="mt-3 font-mediate text-4xl md:text-5xl text-ink">
            {unreadArrived.length > 0 ? `${unreadArrived.length} new letters waiting` : "Your Postbox is quiet"}
          </h1>
          <p className="mt-3 font-okine text-ink/60 max-w-md">
            Letters are shown as they were delivered — sealed, postmarked, and kept exactly as sent.
          </p>
        </div>
        <RouterButton to="/write" variant="primary" size="md" className="shrink-0">
          <IconFeather className="w-4 h-4" />
          Write a letter
        </RouterButton>
      </div>

      {inTransit.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <IconRoute className="w-4 h-4 text-leaf-dark" />
            <h2 className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/50">
              On its way
            </h2>
          </div>
          <div className="space-y-3">
            {inTransit.map((letter) => (
              <div
                key={letter.id}
                className="flex items-center gap-4 rounded-card border border-dashed border-ink/25 bg-cream-dim/40 px-5 py-4 shadow-paper"
              >
                <IconMailbox className="w-6 h-6 text-ink/40 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-okine text-sm text-ink/80 truncate">
                    From <span className="font-semibold">{letter.from}</span>
                  </p>
                  <p className="font-okine text-xs text-ink/45 mt-0.5">
                    Sealed {letter.sealedDate} · arriving in {letter.daysRemaining} day
                    {letter.daysRemaining !== 1 ? "s" : ""}
                  </p>
                </div>
                <span className="shrink-0 font-okine text-[10px] uppercase tracking-[0.14em] text-leaf-dark border border-leaf-dark/40 rounded-full px-3 py-1">
                  In transit
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-2 mb-4">
          <IconEnvelope className="w-4 h-4 text-postbox" />
          <h2 className="font-okine text-[12px] uppercase tracking-[0.2em] text-ink/50">
            In your Postbox
          </h2>
        </div>

        <div className="border-t border-ink/10">
          {arrived.map((letter) => (
            <Link
              key={letter.id}
              to="/letters/$id" params={{ id: letter.id }}
              className="group flex items-start md:items-center gap-4 md:gap-6 border-b border-ink/10 py-5 px-1 hover:bg-ink/[0.03] transition-colors"
            >
              <div
                className={cn(
                  "w-11 h-11 md:w-12 md:h-12 shrink-0 border flex items-center justify-center rounded-sm",
                  letter.status === "read" ? "border-ink/20 text-ink/30" : "border-postbox text-postbox"
                )}
              >
                <IconEnvelope className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-mediate text-lg md:text-xl text-ink truncate">{letter.from}</p>
                  {letter.status !== "read" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-postbox shrink-0" />
                  )}
                </div>
                <p className="font-okine text-sm text-ink/55 truncate mt-0.5">{letter.subjectLine}</p>
                <p className="font-okine text-xs text-ink/40 truncate mt-1 hidden md:block">{letter.preview}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-okine text-[11px] uppercase tracking-wide text-ink/45">
                  {letter.arrivedDate}
                </p>
                <p className="font-okine text-[10px] text-ink/35 mt-1 hidden sm:block">
                  {letter.fromAddress}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
