import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping rates, timelines, and regions for Exception by K&I.",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" updated="Draft — pending launch">
      <p>
        <strong className="text-ink">This is placeholder policy text</strong> for a store still in
        preview mode. Review and finalize with your fulfillment provider and legal counsel before
        launch — actual rates, carriers, and timelines depend on how Shopify Shipping (or a
        third-party fulfillment service) is configured.
      </p>
      <h2>Processing time</h2>
      <p>Orders are typically processed within 1–3 business days once the store is live.</p>
      <h2>Shipping rates &amp; timelines</h2>
      <p>
        Calculated at checkout based on destination and order weight once Shopify Shipping is
        connected. Domestic delivery is expected to take 3–7 business days; international
        timelines and available regions will be confirmed at launch.
      </p>
      <h2>Order tracking</h2>
      <p>A tracking link will be emailed once an order ships and a fulfillment provider is connected.</p>
    </LegalPage>
  );
}
