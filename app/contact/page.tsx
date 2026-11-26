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
        Have a question about an order, a product, or anything else? Reach us any of the ways
        below and we&apos;ll get back to you.
      </p>
      <h2>Exception by K&amp;I LLC</h2>
      <p>
        <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a>
        <br />
        <a href="tel:+17038396354">(703) 839-6354</a>
        <br />
        8684 Belgrove Gardens Lane, Gainesville, VA 20155
      </p>
      <p>We reply within 1 business day, Monday to Friday.</p>
    </LegalPage>
  );
}
