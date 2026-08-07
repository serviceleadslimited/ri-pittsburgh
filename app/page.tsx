import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";
import { getPageBySlug, pageMetadata } from "@/lib/content";

export function generateMetadata(): Metadata {
  return pageMetadata(getPageBySlug("/"));
}

export default function HomePage() {
  return <PageTemplate page={getPageBySlug("/")} />;
}
