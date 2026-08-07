import type { Metadata } from "next";
import PageTemplate from "@/components/PageTemplate";
import { getAllPages, getPageBySlug, pageMetadata } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages()
    .filter((page) => page.slug !== "/")
    .map((page) => ({ slug: page.slug.slice(1) }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(getPageBySlug(`/${slug}`));
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  return <PageTemplate page={getPageBySlug(`/${slug}`)} />;
}
