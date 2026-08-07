import { expect, test } from "@playwright/test";

test("PDP: select a variant and add it to the cart", async ({ page }) => {
  await page.goto("/products/hand-hammered-silver-casserole");
  await expect(page.getByRole("heading", { name: "Hand-Hammered Silver Casserole with Lid" })).toBeVisible();

  await page.getByRole("button", { name: "8 Quart", exact: true }).click();
  await page.getByRole("button", { name: "Polished Silver", exact: true }).click();

  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByRole("button", { name: "Added" })).toBeVisible();

  // Adding a line opens the cart drawer automatically (lib/cart/reducer.ts).
  const drawer = page.getByRole("dialog", { name: "Your Cart" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText("Hand-Hammered Silver Casserole with Lid", { exact: true })).toBeVisible();
});

test("PDP: shows the reviews section with sample reviews for a product that has them", async ({
  page,
}) => {
  await page.goto("/products/hand-hammered-silver-casserole");
  await expect(page.getByRole("heading", { name: "Reviews" })).toBeVisible();
  await expect(page.getByText("Will outlive me")).toBeVisible();
});

test("PDP: shows an honest empty state for a product with no reviews", async ({ page }) => {
  await page.goto("/products/taupe-calligraphy-bakhoor-dome");
  await expect(page.getByRole("heading", { name: "Reviews" })).toBeVisible();
  await expect(page.getByText("No reviews yet for this product.")).toBeVisible();
});
