import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind Exception by K&I.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About Exception by K&I">
      <p>
        Exception by K&amp;I makes cookware, kitchen accessories, and home décor built to be kept
        — not replaced. We favor honest materials (cast iron, brass, copper, stainless steel)
        and construction that holds up to daily use, from a weeknight skillet to the pieces that
        come out for holiday hosting.
      </p>
      <h2>What we make</h2>
      <p>
        Our catalog spans everyday cookware, the small accessories that finish a kitchen, home
        décor for the rooms beyond it, Holiday &amp; Hostess Gifts, and curated gift sets —
        with new categories added as the collection grows.
      </p>
      <h2>Company details</h2>
      <p>Exception by K&amp;I is operated by Exception by K&amp;I LLC, Gainesville, VA.</p>
    </LegalPage>
  );
}
