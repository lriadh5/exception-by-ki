import { expect, test } from "@playwright/test";

test("checkout in preview mode never renders a form field and explains why", async ({ page }) => {
  await page.goto("/products/hand-hammered-silver-casserole");
  await page.getByRole("button", { name: "8 Quart", exact: true }).click();
  await page.getByRole("button", { name: "Polished Silver", exact: true }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByRole("button", { name: "Added" })).toBeVisible();

  // The cart is only persisted to localStorage in a useEffect after the
  // add-to-cart state update — wait for that write before navigating away,
  // or the checkout page can rehydrate before it lands.
  await page.waitForFunction(
    () => (window.localStorage.getItem("exception-by-ki-cart") ?? "").includes("hand-hammered-silver-casserole")
  );

  await page.goto("/checkout");

  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  await expect(page.getByText(/no email, no address, no payment details/i)).toBeVisible();

  const disabledButton = page.getByRole("button", { name: /checkout unavailable/i });
  await expect(disabledButton).toBeDisabled();

  // Scoped to the checkout page's own content, not the sitewide footer
  // newsletter form — mirrors CheckoutClient.test.tsx's PII-free assertion.
  expect(await page.locator("main#main-content input").count()).toBe(0);
});

test("checkout shows an empty-cart state when nothing has been added", async ({ page }) => {
  await page.goto("/checkout");
  await expect(page.getByText(/your cart is empty/i)).toBeVisible();
});
