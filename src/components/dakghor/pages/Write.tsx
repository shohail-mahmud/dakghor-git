import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Field, Input, Textarea, Button } from "../ui";
import { IconSeal, IconCheck } from "../icons";
import { userRepository } from "@/backend/users";
import { letterService } from "@/backend/letter-service";
import { getCurrentAccount } from "@/lib/demo-auth";

export default function Write() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"writing" | "sealing" | "sealed">("writing");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentAccount = getCurrentAccount();

  // Verify recipient address as user enters it
  const recipientCheck = useMemo(() => {
    const clean = recipient.trim().toUpperCase();
    if (!clean || clean.length < 5) return null;
    return userRepository.verifyRecipient(clean);
  }, [recipient]);

  const canSeal =
    recipient.trim().length >= 8 &&
    body.trim().length > 0 &&
    (recipientCheck ? recipientCheck.valid : true);

  const handleSeal = () => {
    if (!canSeal) return;
    setErrorMessage("");

    try {
      const paragraphs = body
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const senderAddr = currentAccount?.address || "DG-7K4P-92";
      const senderNm = currentAccount?.name || "Shohail";

      letterService.sealLetter({
        senderAddress: senderAddr,
        senderName: senderNm,
        recipientAddress: recipient.trim().toUpperCase(),
        subjectLine: subject.trim() || undefined,
        body: paragraphs.length > 0 ? paragraphs : [body.trim()],
      });

      setStage("sealing");
      window.setTimeout(() => setStage("sealed"), 850);
    } catch (err: any) {
      setErrorMessage(err.message || "Could not seal letter. Please verify the address.");
    }
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
            It has entered the Dakghor postal network and is in transit to {recipient.trim().toUpperCase() || "its destination"}.
            There is nothing more to do now but wait.
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
      <h1 className="font-mediate text-4xl md:text-5xl text-ink">Write a letter</h1>
      <p className="mt-3 font-okine text-ink/60 max-w-md">
        Address it, write it, and seal it when it is ready. Once sealed, it cannot be edited, recalled, or unsent.
      </p>

      {errorMessage && (
        <div className="mt-6 rounded-control border border-postbox/30 bg-postbox/10 p-4 text-xs font-okine text-postbox">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-card border border-ink/15 bg-paper shadow-paper">
        {/* Postal address block */}
        <div className="border-b border-ink/15 p-6 md:p-8 grid md:grid-cols-2 gap-6 bg-cream-dim/30">
          <div>
            <Field label="To: Dakghor address">
              <Input
                placeholder="DG-XXXX-XX"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value.toUpperCase())}
              />
            </Field>
            {recipientCheck && (
              <p className={`mt-1.5 text-[11px] font-okine ${recipientCheck.valid ? "text-leaf" : "text-postbox"}`}>
                {recipientCheck.valid
                  ? `Recipient verified (${recipientCheck.displayName || recipientCheck.address})`
                  : "Recipient address not found in postal registry"}
              </p>
            )}
          </div>
          <Field label="Subject line (optional)">
            <Input
              placeholder="What is this letter about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
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
