import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Exception by K&I.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Is the store live yet?",
    a: "Not yet — you're viewing a preview build on sample catalog data. A banner at the top of the site says so whenever it applies. Checkout is disabled until a real store is connected.",
  },
  {
    q: "What materials do you use?",
    a: "Cast iron, stainless steel, brass, and copper are the core materials across the collection — see each product's Material field for specifics.",
  },
  {
    q: "Do you ship internationally?",
    a: "Shipping regions and rates will be finalized once the store is connected — see the Shipping Policy page for what's confirmed so far.",
  },
  {
    q: "What's your return policy?",
    a: "See the Returns & Refunds page for the current policy.",
  },
  {
    q: "How do I care for cast iron and brass pieces?",
    a: "See the Care Guides page, and the Care field on each individual product.",
  },
];

export default function FaqPage() {
  return (
    <LegalPage title="Frequently Asked Questions">
      {faqs.map((item) => (
        <div key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </LegalPage>
  );
}
