import { createFileRoute } from "@tanstack/react-router";
import SignIn from "@/components/dakghor/pages/SignIn";
export const Route = createFileRoute("/sign-in")({ head: () => ({ meta: [{ title: "Sign In — Dakghor" }, { name: "description", content: "Sign in to return to your Dakghor Postbox." }, { property: "og:title", content: "Sign In — Dakghor" }, { property: "og:description", content: "Sign in to return to your Dakghor Postbox." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: SignIn });
