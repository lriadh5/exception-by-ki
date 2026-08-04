import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Exception by K&I.",
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us">
      <p>
        This storefront is currently a preview build without a connected support inbox or contact
        form backend — a submit button here that appeared to work but went nowhere would be
        worse than no form at all, so there isn&apos;t one yet.
      </p>
      <h2>Reach us directly</h2>
      <p>
        <a href="mailto:hello@exceptionbyki.com">hello@exceptionbyki.com</a> — placeholder
        address, replace before launch.
      </p>
      <h2>In the meantime</h2>
      <p>
        Once a support email or help-desk (e.g. Gorgias, Zendesk) is connected, this page will
        include a working contact form and full contact details (phone, hours).
      </p>
    </LegalPage>
  );
}
