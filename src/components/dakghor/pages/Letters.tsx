import { Link } from "@tanstack/react-router";
import { mockLetters } from "@/data/mockLetters";
import { Kicker } from "../ui";
import { IconArchive } from "../icons";

function monthOf(dateStr?: string) {
  if (!dateStr) return "Unfiled";
  return dateStr.split(" ")[1];
}

export default function Letters() {
  const groups = new Map<string, typeof mockLetters>();
  for (const letter of mockLetters) {
    const key = monthOf(letter.arrivedDate ?? letter.sealedDate);
    if (!groups.has(key)) groups.set(key, []);
    const group = groups.get(key);
    if (group) group.push(letter);
  }

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[1000px] mx-auto">
      <Kicker>
        <IconArchive className="w-3 h-3" />
        Kept correspondence
      </Kicker>
      <h1 className="mt-3 font-mediate text-4xl md:text-5xl text-ink">My Letters</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        Every letter you've received, filed by the month it arrived — an archive, not a history.
      </p>

      <div className="mt-12 space-y-14">
        {[...groups.entries()].map(([month, letters]) => (
          <section key={month}>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mediate text-2xl text-ink">{month}</h2>
              <span className="h-px flex-1 bg-ink/15" />
              <span className="font-okine text-[11px] uppercase tracking-[0.14em] text-ink/40">
                {letters.length} letter{letters.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {letters.map((letter, i) => (
                <Link
                  key={letter.id}
                  to="/letters/$id" params={{ id: letter.id }}
                  className="group relative rounded-card border border-ink/15 bg-paper pl-6 pr-5 py-5 shadow-paper hover:border-postbox/60 transition-colors"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-leaf/70 group-hover:bg-postbox transition-colors" />
                  <p className="font-okine text-[10px] uppercase tracking-[0.14em] text-ink/40">
                    No. {String(i + 1).padStart(2, "0")} · {letter.fromAddress}
                  </p>
                  <p className="mt-2 font-mediate text-xl text-ink">{letter.from}</p>
                  <p className="mt-1 font-okine text-sm text-ink/55 line-clamp-1">{letter.subjectLine}</p>
                  <p className="mt-3 font-okine text-[11px] uppercase tracking-wide text-ink/40">
                    Arrived {letter.arrivedDate ?? "—"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
