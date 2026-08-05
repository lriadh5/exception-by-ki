import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { CartProvider } from "@/lib/cart/cart-context";
import { WishlistProvider } from "@/lib/wishlist/wishlist-context";
import { RecentlyViewedProvider } from "@/lib/recently-viewed/recently-viewed-context";
import { CookieConsentProvider } from "@/lib/cookie-consent/cookie-consent-context";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { IS_PREVIEW_MODE, SITE_URL } from "@/lib/env";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Exception by K&I — Considered Cookware & Home",
    template: "%s | Exception by K&I",
  },
  description:
    "Heirloom-grade cookware, kitchen accessories, and home décor — including Ramadan & Eid pieces and curated gift sets.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Exception by K&I",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

// themeColor mirrors --color-ink (app/globals.css) — the browser chrome
// color on mobile (address bar, task switcher). Revisit once the brand
// green replaces --color-ink as the primary color.
export const viewport: Viewport = {
  themeColor: "#1a1613",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* FadeIn (components/ui/FadeIn.tsx) hides content until an
            IntersectionObserver reveals it — without JS that never runs,
            so force it visible rather than leave sections permanently
            invisible. */}
        <noscript>
          <style>{`.js-fade-hidden { opacity: 1 !important; }`}</style>
        </noscript>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <CookieConsentProvider>
          <CartProvider isPreviewMode={IS_PREVIEW_MODE}>
            <WishlistProvider>
              <RecentlyViewedProvider>
                {IS_PREVIEW_MODE && <PreviewBanner />}
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
                >
                  Skip to content
                </a>
                <Header />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
                <CookieConsentBanner />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
