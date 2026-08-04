import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Return and refund policy for Exception by K&I.",
};

export default function ReturnsRefundsPage() {
  return (
    <LegalPage title="Returns & Refunds" updated="Draft — pending launch">
      <p>
        <strong className="text-ink">This is placeholder policy text</strong> — finalize with
        legal counsel before launch, and confirm it matches how returns are actually configured
        in Shopify.
      </p>
      <h2>Return window</h2>
      <p>
        Unused items in original packaging may be returned within 30 days of delivery for a full
        refund to the original payment method.
      </p>
      <h2>Non-returnable items</h2>
      <p>Gift cards and final-sale items (marked as such at purchase) are not eligible for return.</p>
      <h2>How to start a return</h2>
      <p>
        A self-serve returns flow will be linked here once the store is connected. Until then,
        see the Contact Us page.
      </p>
      <h2>Refund timing</h2>
      <p>Refunds are issued within 5–10 business days of the returned item being received.</p>
    </LegalPage>
  );
}
