import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our accessibility commitment and how to report issues.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility">
      <p>
        We&apos;re building this site to meet WCAG 2.1 AA as a baseline. Concretely, that includes
        (and is verified in this codebase — see README &ldquo;Testing&rdquo;):
      </p>
      <ul>
        <li>Keyboard-operable navigation, cart, and forms, with visible focus states.</li>
        <li>A focus-trapped, escape-to-close cart dialog that returns focus on close.</li>
        <li>Screen reader announcements for cart changes.</li>
        <li>Sufficient color contrast in the brand palette.</li>
        <li>Semantic landmarks and a skip-to-content link.</li>
      </ul>
      <h2>Known gaps</h2>
      <p>
        This is a preview build — product photography, once added, will need alt text audited,
        and a full manual screen reader pass (VoiceOver/NVDA) is still pending before launch.
      </p>
      <h2>Reporting an issue</h2>
      <p>
        If you encounter an accessibility barrier, please let us know via the Contact Us page once
        it&apos;s connected.
      </p>
    </LegalPage>
  );
}
