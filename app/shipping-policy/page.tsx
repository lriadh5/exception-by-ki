import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping rates, timelines, and regions for Exception by K&I.",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" updated="November 26, 2026">
      <p>We ship within the United States only.</p>
      <h2>Processing time</h2>
      <p>Orders are processed in 1 to 3 business days.</p>
      <h2>Standard shipping</h2>
      <p>3 to 7 business days, by order weight:</p>
      <ul>
        <li>
          Most states — under 2 lb: $6; 2 to 4.99 lb: $9; 5 to 9.99 lb: $14; 10 lb and over: $22.
        </li>
        <li>
          CA, OR, WA, NV, AK, HI, U.S. territories, and military addresses — under 2 lb: $9; 2 to
          4.99 lb: $13; 5 to 9.99 lb: $19; 10 lb and over: $29.
        </li>
      </ul>
      <p>Free standard shipping on orders of $70 or more.</p>
      <h2>Express shipping</h2>
      <p>
        2 to 4 business days: $15, or $22 to CA, OR, WA, NV, AK, HI, U.S. territories, and military
        addresses.
      </p>
      <h2>Order tracking</h2>
      <p>Tracking is emailed when your order ships.</p>
      <h2>Questions</h2>
      <p>
        Call <a href="tel:+17038396354">(703) 839-6354</a> or email{" "}
        <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
