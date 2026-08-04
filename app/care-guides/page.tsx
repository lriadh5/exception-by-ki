import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Care Guides",
  description: "How to care for cast iron, brass, copper, and stainless cookware.",
};

const guides = [
  {
    material: "Enameled Cast Iron",
    tips: [
      "Hand wash with warm water and mild soap; avoid metal utensils on the enamel surface.",
      "Dry immediately to prevent water spots.",
      "Safe for oven use, but check your specific piece's temperature limit.",
    ],
  },
  {
    material: "Brass",
    tips: [
      "Hand wash and dry immediately — standing water tarnishes brass.",
      "A light polish restores shine if it dulls over time.",
      "Avoid the dishwasher.",
    ],
  },
  {
    material: "Copper Core / Stainless Steel",
    tips: [
      "Dishwasher safe, but hand washing preserves the finish longer.",
      "Avoid high heat with nothing in the pan — it can discolor stainless steel.",
    ],
  },
];

export default function CareGuidesPage() {
  return (
    <LegalPage title="Care Guides">
      <p>General guidance by material — always check the Care field on the specific product first.</p>
      {guides.map((g) => (
        <div key={g.material}>
          <h2>{g.material}</h2>
          <ul>
            {g.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      ))}
    </LegalPage>
  );
}
