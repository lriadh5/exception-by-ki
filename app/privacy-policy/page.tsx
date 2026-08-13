import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Exception by K&I collects, uses, and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Draft — pending legal review">
      <p>
        <strong className="text-ink">
          This is placeholder policy text and is not a substitute for legal advice.
        </strong>{" "}
        Have counsel review and finalize this page — including GDPR/CCPA obligations for your
        actual regions of operation — before this site collects real customer data.
      </p>
      <h2>What we collect today</h2>
      <p>
        In this preview build: nothing. There is no checkout, no account system, and no contact
        form connected to a backend, so no personal data is transmitted to us through this site
        yet. A cart and wishlist are stored only in your browser&apos;s local storage and never
        leave your device.
      </p>
      <h2>Cookies &amp; analytics</h2>
      <p>
        We ask for consent before enabling any analytics (see the cookie banner). No analytics
        provider is connected yet — see README &ldquo;Prepared, not built.&rdquo;
      </p>
      <h2>What we&apos;ll collect once live</h2>
      <p>
        Once checkout is connected, this section will disclose exactly what&apos;s collected
        (contact/shipping details, order history) and how it&apos;s used, shared with processors
        (Shopify, payment providers, shipping carriers), and retained.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your data.
        Contact details for exercising these rights will be added once the Contact Us page is
        connected.
      </p>
    </LegalPage>
  );
}
