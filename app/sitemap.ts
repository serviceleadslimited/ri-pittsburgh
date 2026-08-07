import type { MetadataRoute } from "next";
import { canonicalUrl, getAllPages } from "@/lib/content";
import { isSearchIndexable } from "@/lib/seo-policy";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPages()
    .filter(isSearchIndexable)
    .map((page) => ({
      url: canonicalUrl(page.slug),
      changeFrequency: "monthly",
      priority: page.slug === "/" ? 1 : 0.8,
    }));
}
