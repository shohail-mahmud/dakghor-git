import { createFileRoute } from "@tanstack/react-router";
import Postbox from "@/components/dakghor/pages/Postbox";

export const Route = createFileRoute("/postbox")({
  head: () => ({
    meta: [
      { title: "Postbox — Dakghor" },
      { name: "description", content: "See letters waiting to be unsealed in your Dakghor Postbox." },
      { property: "og:title", content: "Postbox — Dakghor" },
      { property: "og:description", content: "See letters waiting to be unsealed in your Dakghor Postbox." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Postbox,
});
