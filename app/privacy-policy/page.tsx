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
        actual regions of operation — as soon as possible, since this site now collects real
        customer data.
      </p>
      <h2>What we collect</h2>
      <p>
        When you place an order, we and our processors collect your name, email address, shipping
        and billing address, and payment information needed to fulfill it. Checkout and payment
        processing are handled by Shopify and its payment processor; we don&apos;t store your
        payment card details ourselves. If you email us, we receive whatever you send in that
        message. A cart and wishlist are also stored in your browser&apos;s local storage and
        never leave your device unless you check out.
      </p>
      <h2>Cookies &amp; analytics</h2>
      <p>
        We ask for consent before enabling any analytics or marketing cookies (see the cookie
        banner), and only enable the services you consent to.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your data.
        Contact us at <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a> to
        exercise these rights.
      </p>
    </LegalPage>
  );
}
