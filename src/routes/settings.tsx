import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/components/dakghor/pages/Settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Dakghor" },
      { name: "description", content: "Manage your Dakghor account and credentials." },
      { property: "og:title", content: "Settings — Dakghor" },
      { property: "og:description", content: "Manage your Dakghor account and credentials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});
