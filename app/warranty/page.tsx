import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Warranty",
  description: "Warranty coverage for Exception by K&I cookware and home goods.",
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <LegalPage title="Warranty" updated="November 26, 2026">
      <h2>Coverage</h2>
      <p>
        Cookware is intended to be built to last. Manufacturing defects are covered for a limited
        warranty period from the date of purchase; normal wear (seasoning loss, scratches,
        discoloration from use) is not covered.
      </p>
      <h2>What&apos;s not covered</h2>
      <p>Damage from misuse, improper care (see Care Guides), or use outside the product&apos;s intended purpose.</p>
      <h2>Making a claim</h2>
      <p>
        Email <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a> or call{" "}
        <a href="tel:+17038396354">(703) 839-6354</a> with your order number and a description (or
        photo) of the issue, and we&apos;ll help from there.
      </p>
    </LegalPage>
  );
}
