import Link from "next/link";
import Image from "next/image";
import { primaryNav } from "@/lib/nav";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

const helpLinks = [
  { title: "FAQ", href: "/faq" },
  { title: "Shipping Policy", href: "/shipping-policy" },
  { title: "Returns & Refunds", href: "/returns-refunds" },
  { title: "Care Guides", href: "/care-guides" },
  { title: "Warranty", href: "/warranty" },
  { title: "Contact Us", href: "/contact" },
];

const contentLinks = [{ title: "Guides & Inspiration", href: "/guides" }];

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Accessibility", href: "/accessibility" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-conditions" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-6 gap-10">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Image src="/logo.png" alt="Exception by K&amp;I" width={88} height={52} className="h-10 w-auto" />
            <p className="text-sm text-ink-soft max-w-sm mt-3">
              Considered cookware, kitchen accessories, and home décor for
              everyday tables and the occasions that matter.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div>
          <h4 className="text-sm text-ink mb-3">Shop</h4>
          <ul className="space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-soft hover:text-ink"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm text-ink mb-3">Discover</h4>
          <ul className="space-y-2">
            {contentLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-ink">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm text-ink mb-3">Help</h4>
          <ul className="space-y-2">
            {helpLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-ink">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm text-ink mb-3">Company</h4>
          <ul className="space-y-2">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-ink">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-6 py-6 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Exception by K&amp;I. All rights reserved.
      </div>
    </footer>
  );
}
