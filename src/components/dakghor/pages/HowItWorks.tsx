import { Kicker } from "../ui";
import { RouterButton } from "../ui";
import { Postmark } from "../ui";
import { IconPin, IconFeather, IconSeal, IconRoute, IconEnvelopeOpen } from "../icons";

const steps = [
  {
    n: "01",
    icon: IconPin,
    title: "Get your address",
    body: "Create an account and Dakghor issues you a unique postal address — something like DG-7K4P-92. It's yours alone, and it's how people find you.",
  },
  {
    n: "02",
    icon: IconFeather,
    title: "Write a letter",
    body: "Open a blank page, address it to someone's Dakghor address, and write. There's no character limit, no typing indicator, no pressure to reply immediately.",
  },
  {
    n: "03",
    icon: IconSeal,
    title: "Seal it",
    body: "When you're finished, you seal the letter instead of sending it. Sealing is deliberate — once closed, the letter can't be edited or unsent.",
  },
  {
    n: "04",
    icon: IconRoute,
    title: "The postal network",
    body: "Your letter enters the Dakghor network and travels. Depending on distance and route, it may take anywhere from a few hours to a few days to arrive.",
  },
  {
    n: "05",
    icon: IconEnvelopeOpen,
    title: "It arrives",
    body: "The recipient finds it waiting in their Postbox, postmarked with the date it was sealed. They open it when they're ready — not the moment it lands.",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
          <Kicker>A slower kind of delivery</Kicker>
          <h1 className="mt-5 font-mediate text-4xl md:text-6xl leading-[1.05] text-ink max-w-3xl">
            How a letter finds its way through Dakghor.
          </h1>
          <p className="mt-6 font-okine text-ink/65 leading-relaxed max-w-lg">
            Five steps stand between a blank page and a letter in someone's hands. None of
            them are instant, and that's the point.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1000px] px-5 md:px-10 py-14 md:py-20">
          {steps.map((step, i) => (
            <div key={step.n} className="relative grid md:grid-cols-12 gap-6 md:gap-10 pb-14 md:pb-20">
              {i !== steps.length - 1 && (
                <div className="absolute left-[27px] md:left-[43px] top-[64px] bottom-0 w-px dash-route opacity-40" />
              )}
              <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                <span className="w-14 h-14 md:w-[86px] md:h-[86px] rounded-full border border-ink/20 flex items-center justify-center font-mediate text-xl md:text-3xl text-postbox bg-cream shrink-0 z-10">
                  {step.n}
                </span>
              </div>
              <div className="md:col-span-9 md:col-start-4">
                <step.icon className="w-8 h-8 text-leaf-dark mb-4" />
                <h2 className="font-mediate text-2xl md:text-4xl text-ink mb-3">{step.title}</h2>
                <p className="font-okine text-ink/65 leading-relaxed max-w-xl">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ink text-cream">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-3 flex md:justify-start">
            <Postmark label="ARRIVED SAFELY" date="Delivered" tone="postbox" className="text-cream w-32 h-32 md:w-36 md:h-36" />
          </div>
          <div className="md:col-span-6">
            <h2 className="font-mediate text-3xl md:text-4xl leading-tight">
              No notifications every minute. Just a letter, waiting when it's time.
            </h2>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <RouterButton to="/create-account" variant="primary" size="lg">
              Get your address
            </RouterButton>
          </div>
        </div>
      </section>
    </div>
  );
}
