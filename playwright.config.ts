import { defineConfig, devices } from "@playwright/test";

/**
 * E2E smoke suite — runs against `next dev` (not a production build, so
 * NEXT_PUBLIC_SITE_URL isn't required) on the sample catalog, in preview
 * mode, same as local development. See README "Testing".
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Pre-installed browser in this environment — see AGENTS.md/CLAUDE.md
        // setup notes. Falls back to Playwright's own resolution when unset.
        launchOptions: process.env.PLAYWRIGHT_BROWSERS_PATH
          ? { executablePath: "/opt/pw-browsers/chromium" }
          : {},
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
