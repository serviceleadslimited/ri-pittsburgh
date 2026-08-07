import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileCallBar from "@/components/MobileCallBar";
import { organizationSchema } from "@/lib/schema";
import {
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
  WEBMCP_ORIGIN_TRIAL_TOKEN,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  other: { "msapplication-TileColor": THEME_COLOR },
};

// themeColor lives here, not in metadata — Metadata.themeColor is deprecated
// in this Next version in favor of the viewport export.
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* pb-14 keeps the sticky mobile call bar from covering the footer */}
      <body className="pb-14 md:pb-0">
        {/* Enables the WebMCP API (QuoteForm's declarative tool annotations) in
            Chrome for this origin during the origin trial. React 19 hoists
            <meta> tags into <head>, including in the prerendered HTML. */}
        {WEBMCP_ORIGIN_TRIAL_TOKEN && (
          <meta httpEquiv="origin-trial" content={WEBMCP_ORIGIN_TRIAL_TOKEN} />
        )}
        <JsonLd data={organizationSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <Analytics />
      </body>
    </html>
  );
}
