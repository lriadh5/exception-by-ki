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
        Have a question about an order, a product, or anything else? Email us and we&apos;ll get
        back to you.
      </p>
      <h2>Reach us directly</h2>
      <p>
        <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a>
      </p>
    </LegalPage>
  );
}
