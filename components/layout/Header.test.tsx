import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { CartProvider } from "@/lib/cart/cart-context";
import { primaryNav } from "@/lib/nav";

function renderHeader() {
  return render(
    <CartProvider isPreviewMode>
      <Header />
    </CartProvider>
  );
}

describe("Header navigation", () => {
  it("renders every primary nav item as a link to the right collection", () => {
    renderHeader();
    primaryNav.forEach((item) => {
      // Each link appears twice: desktop nav + mobile nav panel.
      const links = screen.getAllByRole("link", { name: item.title });
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => expect(link).toHaveAttribute("href", item.href));
    });
  });

  it("mobile menu button starts collapsed and toggles aria-expanded/aria-controls correctly", async () => {
    renderHeader();
    const user = userEvent.setup();
    const menuButton = screen.getByRole("button", { name: /open menu/i });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    const controlsId = menuButton.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId as string)).not.toBeNull();
    expect(document.getElementById(controlsId as string)).toHaveAttribute("hidden");

    await user.click(menuButton);

    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(controlsId as string)).not.toHaveAttribute("hidden");
  });

  it("cart button exposes aria-controls pointing at the (unmounted-until-open) cart drawer", () => {
    renderHeader();
    const cartButton = screen.getByRole("button", { name: /open cart/i });
    expect(cartButton).toHaveAttribute("aria-controls", "cart-drawer");
    expect(cartButton).toHaveAttribute("aria-expanded", "false");
  });
});
