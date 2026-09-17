import { createFileRoute } from "@tanstack/react-router";
import LetterView from "@/components/dakghor/pages/LetterView";

export const Route = createFileRoute("/letters/$id")({
  head: () => ({
    meta: [
      { title: "Letter — Dakghor" },
      { name: "description", content: "Open and read a letter from your Dakghor Postbox." },
      { property: "og:title", content: "Letter — Dakghor" },
      { property: "og:description", content: "Open and read a letter from your Dakghor Postbox." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LetterRoute,
});

function LetterRoute() {
  const { id } = Route.useParams();
  return <LetterView id={id} />;
}
