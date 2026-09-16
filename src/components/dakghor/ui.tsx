import { Link, type LinkProps } from "@tanstack/react-router";
import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "leaf";
type Size = "sm" | "md" | "lg";

const base = "inline-flex items-center justify-center gap-2 rounded-btn font-ui font-semibold uppercase tracking-[0.08em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-postbox focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
const variants: Record<Variant, string> = {
  primary: "border border-postbox-dark/30 bg-postbox text-cream shadow-tactile hover:bg-postbox-dark hover:-translate-y-px active:translate-y-px active:shadow-none",
  secondary: "border border-ink/55 bg-paper text-ink shadow-paper hover:border-ink hover:bg-ink hover:text-cream active:translate-y-px",
  ghost: "bg-transparent text-ink/70 hover:text-postbox",
  leaf: "border border-leaf-dark/35 bg-leaf text-ink shadow-tactile hover:bg-leaf-dark active:translate-y-px",
};
const sizes: Record<Size, string> = { sm: "px-4 py-2 text-[11px]", md: "px-6 py-3 text-xs", lg: "px-8 py-4 text-sm" };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; children: ReactNode; }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant = "primary", size = "md", children, ...props }, ref) {
  return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>;
});

export function RouterButton({ className, variant = "primary", size = "md", children, ...props }: LinkProps & { variant?: Variant; size?: Size; children: ReactNode }) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</Link>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block font-ui text-[11px] uppercase tracking-[0.18em] text-ink/60">{label}</span>{children}{hint && <span className="mt-1.5 block font-ui text-[11px] text-ink/45">{hint}</span>}</label>;
}
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-control border border-ink/20 bg-paper px-4 py-3 font-ui text-[15px] text-ink shadow-inset outline-none transition-colors placeholder:text-ink/35 focus:border-postbox focus:ring-2 focus:ring-postbox/15", className)} {...props} />;
}
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("w-full resize-none rounded-control border border-ink/20 bg-paper px-4 py-3 font-ui text-[15px] text-ink shadow-inset outline-none transition-colors placeholder:text-ink/35 focus:border-postbox focus:ring-2 focus:ring-postbox/15", className)} {...props} />;
}
export function Kicker({ children, className }: { children: ReactNode; className?: string; tone?: "postbox" | "leaf" | "ink" }) {
  return <div className={cn("inline-flex items-center font-ui text-[11px] uppercase tracking-[0.22em] text-ink/55", className)}>{children}</div>;
}

export function Postmark({ label = "DAKGHOR", date, className, tone = "ink" }: { label?: string; date?: string; className?: string; tone?: "ink" | "postbox" | "leaf" }) {
  const color = tone === "postbox" ? "var(--postbox)" : tone === "leaf" ? "var(--leaf-dark)" : "var(--ink)";
  const id = `postmark-${label.replace(/\s+/g, "")}`;
  return <svg viewBox="0 0 140 140" className={cn("h-28 w-28", className)} style={{ color }} aria-hidden="true"><defs><path id={id} d="M 20 70 A 50 50 0 0 1 120 70" /></defs><circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="70" cy="70" r="52" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5"/><text fill="currentColor" fontSize="12" letterSpacing="3" fontFamily="Sora, sans-serif" fontWeight="600"><textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{label}</textPath></text><line x1="30" y1="90" x2="110" y2="90" stroke="currentColor"/><text x="70" y="108" fill="currentColor" fontSize="10.5" letterSpacing="1.5" textAnchor="middle" fontFamily="Sora, sans-serif">{date?.toUpperCase()}</text><line x1="6" y1="70" x2="24" y2="66" stroke="currentColor"/><line x1="6" y1="76" x2="24" y2="80" stroke="currentColor"/><line x1="134" y1="70" x2="116" y2="66" stroke="currentColor"/><line x1="134" y1="76" x2="116" y2="80" stroke="currentColor"/></svg>;
}
export function Stamp({ className, tone = "postbox" }: { className?: string; tone?: "postbox" | "leaf" | "ink" }) {
  const bg = tone === "postbox" ? "bg-postbox" : tone === "leaf" ? "bg-leaf" : "bg-ink";
  return <div className={cn("stamp-edge relative flex h-20 w-16 shrink-0 items-center justify-center rounded-stamp border-[3px] border-dotted border-cream shadow-paper", bg, tone === "leaf" ? "text-ink" : "text-cream", className)}><svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M3 6.5 12 13l9-6.5"/></svg></div>;
}
export function Envelope({ className }: { className?: string }) {
  return <div className={cn("rounded-card bg-cream-deep p-2 shadow-paper", className)}><svg viewBox="0 0 320 220" className="h-auto w-full" aria-label="A sealed postal envelope"><rect x="4" y="4" width="312" height="212" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2"/><path d="M8 10 160 130 312 10" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/><path d="M8 210 118 108M312 210 202 108" fill="none" stroke="var(--ink)" strokeWidth="1.4" opacity=".5"/><circle cx="160" cy="118" r="20" fill="var(--postbox)"/><path d="m153 119 5 5 10-12" fill="none" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="228" y="24" width="46" height="58" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeDasharray="2.2 2.2"/></svg></div>;
}
