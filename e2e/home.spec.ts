import { expect, test } from "@playwright/test";

test("homepage loads, shows the preview banner, and links into the catalog", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/preview build/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "EXCEPTION" })).toBeVisible();

  await page.getByRole("navigation", { name: "Primary" }).first().getByRole("link").first().click();
  await expect(page).toHaveURL(/\/collections\//);
});

test("search is reachable from the header and returns results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search/);

  await page.getByRole("searchbox").or(page.getByRole("textbox")).first().fill("casserole");
  await page.keyboard.press("Enter");
  await expect(page.getByText(/casserole/i).first()).toBeVisible();
});
