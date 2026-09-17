import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/components/dakghor/pages/Terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Dakghor" },
      { name: "description", content: "Postal principles and terms governing correspondence on Dakghor." },
      { property: "og:title", content: "Terms of Service | Dakghor" },
      { property: "og:description", content: "Postal principles and terms governing correspondence on Dakghor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});
