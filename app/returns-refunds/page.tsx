import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Return and refund policy for Exception by K&I.",
  alternates: { canonical: "/returns-refunds" },
};

export default function ReturnsRefundsPage() {
  return (
    <LegalPage title="Returns & Refunds" updated="November 26, 2026">
      <h2>Return window</h2>
      <p>Returns are accepted within 30 days of delivery, unused and in original packaging.</p>
      <h2>Return shipping</h2>
      <p>
        Customers pay return shipping, unless the item arrived damaged or wrong, in which case we
        cover it.
      </p>
      <h2>Refund timing</h2>
      <p>
        Refunds go to the original payment method within 5 to 10 business days after we receive
        the return.
      </p>
      <h2>Non-returnable items</h2>
      <p>Gift cards and final-sale items can&apos;t be returned.</p>
      <h2>How to start a return</h2>
      <p>
        Email <a href="mailto:exceptionbyki@gmail.com">exceptionbyki@gmail.com</a> or call{" "}
        <a href="tel:+17038396354">(703) 839-6354</a> with your order number.
      </p>
      <p>Return address: 8684 Belgrove Gardens Lane, Gainesville, VA 20155.</p>
    </LegalPage>
  );
}
