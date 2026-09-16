import { createFileRoute } from "@tanstack/react-router";
import LetterView from "@/components/dakghor/pages/LetterView";
export const Route = createFileRoute("/letters/$id")({ head: () => ({ meta: [{ title: "Letter — Dakghor" }, { name: "description", content: "Read a letter from your Dakghor archive." }, { property: "og:title", content: "Letter — Dakghor" }, { property: "og:description", content: "Read a letter from your Dakghor archive." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: LetterRoute });
function LetterRoute() { const { id } = Route.useParams(); return <LetterView id={id}/>; }
