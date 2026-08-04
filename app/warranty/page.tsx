import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Warranty",
  description: "Warranty coverage for Exception by K&I cookware and home goods.",
};

export default function WarrantyPage() {
  return (
    <LegalPage title="Warranty" updated="Draft — pending launch">
      <p>
        <strong className="text-ink">This is placeholder policy text</strong> — confirm actual
        coverage terms with your manufacturers/suppliers before launch.
      </p>
      <h2>Coverage</h2>
      <p>
        Cookware is intended to be built to last. Manufacturing defects are covered for a limited
        warranty period from the date of purchase; normal wear (seasoning loss, scratches,
        discoloration from use) is not covered.
      </p>
      <h2>What&apos;s not covered</h2>
      <p>Damage from misuse, improper care (see Care Guides), or use outside the product&apos;s intended purpose.</p>
      <h2>Making a claim</h2>
      <p>A warranty claims process will be added here once a support channel is connected — see Contact Us.</p>
    </LegalPage>
  );
}
