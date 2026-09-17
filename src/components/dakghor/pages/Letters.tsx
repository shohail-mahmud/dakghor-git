import { useState } from "react";
import { RouterButton, Button } from "../ui";
import { IconArchive, IconClose } from "../icons";
import { useCorrespondenceLog, clearCorrespondenceLog } from "@/lib/letters-store";

export default function Letters() {
  const log = useCorrespondenceLog();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = () => {
    clearCorrespondenceLog();
    setConfirmClear(false);
  };

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[900px] mx-auto">
      <div className="flex items-start justify-between gap-6 flex-wrap mb-10 md:mb-12">
        <div>
          <h1 className="font-mediate text-4xl md:text-5xl text-ink">My Letters</h1>
          <p className="mt-3 font-okine text-sm md:text-base text-ink/60 max-w-xl leading-relaxed">
            A private correspondence log kept on this device. Dakghor records basic metadata only, never the readable content of unsealed letters.
          </p>
        </div>

        {log.length > 0 && (
          <div className="shrink-0 self-start">
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="leaf"
                  size="sm"
                  onClick={handleClear}
                  className="!text-[11px]"
                >
                  Confirm clear
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                  className="!text-[11px]"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmClear(true)}
                className="!text-ink/45 hover:!text-postbox !text-[11px]"
              >
                <IconClose className="w-3.5 h-3.5" />
                Clear local log
              </Button>
            )}
          </div>
        )}
      </div>

      {log.length === 0 ? (
        <div className="paper-grain rounded-card border border-ink/15 bg-paper/60 p-10 md:p-14 text-center shadow-paper">
          <IconArchive className="mx-auto w-10 h-10 text-ink/30 mb-4" />
          <h2 className="font-mediate text-2xl text-ink">Your local log is empty</h2>
          <p className="mt-2 font-okine text-sm text-ink/55 max-w-md mx-auto leading-relaxed">
            When you unseal a letter in your Postbox, its sender and sealed date will be noted in this ledger.
          </p>
          <div className="mt-8">
            <RouterButton to="/postbox" variant="primary" size="md">
              Go to Postbox
            </RouterButton>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper">
          <div className="border-b border-ink/10 bg-cream-dim/40 px-6 py-3.5 grid grid-cols-12 gap-4 font-ui text-[11px] uppercase tracking-[0.14em] text-ink/50">
            <div className="col-span-6 md:col-span-5">Sender</div>
            <div className="col-span-3 md:col-span-3">Sealed Date</div>
            <div className="col-span-3 md:col-span-4">Opened on Device</div>
          </div>

          <div className="divide-y divide-ink/10">
            {log.map((entry) => (
              <div
                key={`${entry.id}-${entry.openedDate}`}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-6 md:col-span-5 min-w-0 pr-2">
                  <p className="font-mediate text-base text-ink font-medium truncate">
                    {entry.from}
                  </p>
                  <p className="font-okine text-xs text-ink/45 truncate mt-0.5">
                    {entry.fromAddress}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-3 font-okine text-xs text-ink/65">
                  {entry.sealedDate}
                </div>
                <div className="col-span-3 md:col-span-4 font-okine text-xs text-ink/55">
                  {entry.openedDate}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-ink/10 bg-cream-dim/20 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink/45 font-okine">
            <span>
              {log.length} correspondence {log.length === 1 ? "entry" : "entries"} recorded on this browser.
            </span>
            <span>Private log · Basic metadata only</span>
          </div>
        </div>
      )}
    </div>
  );
}
