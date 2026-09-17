import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/components/dakghor/pages/Privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Dakghor" },
      { name: "description", content: "How Dakghor protects your privacy, correspondence, and identity." },
      { property: "og:title", content: "Privacy Policy | Dakghor" },
      { property: "og:description", content: "How Dakghor protects your privacy, correspondence, and identity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});
