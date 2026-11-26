import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Exception by K&I website.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="November 26, 2026">
      <p>
        This page is provided for informational purposes and is not a substitute for legal advice.
        We review it periodically with counsel.
      </p>
      <h2>Use of this site</h2>
      <p>
        By using this site you agree not to misuse it — including attempting to disrupt its
        operation, scraping content for resale, or infringing on its intellectual property.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site content, branding, and design are the property of Exception by K&amp;I unless
        otherwise noted.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        Exception by K&amp;I LLC is not liable for indirect, incidental, or consequential damages
        arising from use of this site, to the fullest extent permitted by law.
      </p>
    </LegalPage>
  );
}
