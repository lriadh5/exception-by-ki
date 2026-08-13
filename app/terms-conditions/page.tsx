import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Exception by K&I website.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="Draft — pending legal review">
      <p>
        <strong className="text-ink">
          This is placeholder terms text and is not a substitute for legal advice.
        </strong>{" "}
        Have counsel review and finalize this page before launch.
      </p>
      <h2>Preview status</h2>
      <p>
        This site is a preview build. Product availability, pricing, and content shown here are
        illustrative sample data, not a real offer for sale, until a Shopify store is connected
        and this notice is removed.
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
      <p>Finalize with counsel — this section needs jurisdiction-specific language.</p>
    </LegalPage>
  );
}
