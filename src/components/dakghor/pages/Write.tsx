import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Field, Input, Textarea } from "../ui";
import { Button } from "../ui";
import { Kicker } from "../ui";
import { IconSeal, IconCheck } from "../icons";

export default function Write() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"writing" | "sealing" | "sealed">("writing");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const canSeal = recipient.trim().length > 2 && body.trim().length > 0;

  const handleSeal = () => {
    if (!canSeal) return;
    setStage("sealing");
    window.setTimeout(() => setStage("sealed"), 900);
  };

  if (stage === "sealed") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="mx-auto w-24 h-24 rounded-full bg-postbox flex items-center justify-center animate-seal-stamp">
            <IconCheck className="w-10 h-10 text-cream" />
          </div>
          <h1 className="mt-8 font-mediate text-3xl md:text-4xl text-ink">Your letter is sealed.</h1>
          <p className="mt-4 font-okine text-ink/60 leading-relaxed">
            It has entered the Dakghor postal network and is on its way to {recipient || "its recipient"}.
            There's nothing more to do now but wait.
          </p>
          <Button size="lg" className="mt-8" onClick={() => navigate({ to: "/postbox" })}>
            Back to Postbox
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-12 py-10 md:py-14 max-w-[820px] mx-auto">
      <Kicker>New correspondence</Kicker>
      <h1 className="mt-3 font-mediate text-4xl md:text-5xl text-ink">Write a letter</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        Address it, write it, and seal it when it's ready. Once sealed, it cannot be edited or unsent.
      </p>

      <div className="mt-10 overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper">
        {/* Postal address block */}
        <div className="border-b border-ink/15 p-6 md:p-8 grid md:grid-cols-2 gap-6 bg-cream-dim/30">
          <Field label="To — Dakghor address">
            <Input
              placeholder="DG-XXXX-XX"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value.toUpperCase())}
            />
          </Field>
          <Field label="Subject line (optional)">
            <Input placeholder="What's this letter about?" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Field>
        </div>

        {/* Paper writing surface */}
        <div className="p-6 md:p-10 paper-ruled min-h-[420px]">
          <Textarea
            className="font-mediate text-lg md:text-[21px] leading-[2.05rem] min-h-[380px] border-none focus:border-none !py-0"
            placeholder="Dear friend,"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 sticky bottom-4 md:static flex items-center justify-between gap-4 rounded-nav bg-cream/95 p-3 shadow-paper md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none border border-ink/10">
        <p className="font-okine text-xs text-ink/45 hidden sm:block">
          {body.trim().length} characters · no limit
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button variant="secondary" size="md" type="button" disabled={stage === "sealing"}>
            Save draft
          </Button>
          <Button
            variant="primary"
            size="md"
            type="button"
            disabled={!canSeal || stage === "sealing"}
            onClick={handleSeal}
          >
            <IconSeal className="w-4 h-4" />
            {stage === "sealing" ? "Sealing…" : "Seal letter"}
          </Button>
        </div>
      </div>
    </div>
  );
}
