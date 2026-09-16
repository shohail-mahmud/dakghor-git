import { RouterButton } from "../ui";
import { Postmark } from "../ui";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-20">
      <Postmark label="RETURN TO SENDER" date="Not found" tone="postbox" className="w-32 h-32 mb-8" />
      <h1 className="font-mediate text-4xl md:text-5xl text-ink">This address doesn't exist.</h1>
      <p className="mt-4 font-okine text-ink/60 max-w-sm">
        The page you're looking for may have been misfiled, or never existed in this network.
      </p>
      <RouterButton to="/" variant="primary" size="lg" className="mt-8">
        Back to Dakghor
      </RouterButton>
    </div>
  );
}
