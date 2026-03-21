import { test, expect } from "@playwright/test";

/**
 * Authenticated E2E tests.
 * These test the full crossing → dashboard flow.
 * They use the auth page UI to sign in.
 */

const TEST_EMAIL = "markcijo@gmail.com";
const TEST_PASSWORD = "Br@wnyc0de";

test.describe("Authenticated flow", () => {
  test("can sign in with email/password", async ({ page }) => {
    await page.goto("/auth");
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();

    // Should redirect to dashboard
    await page.waitForURL("**/dashboard", { timeout: 15000 });
    await expect(page.getByText(TEST_EMAIL)).toBeVisible({ timeout: 10000 });
  });

  test("crossing intro shows 3 steps and Begin button", async ({ page }) => {
    await page.goto("/crossing");
    await expect(page.getByText("Before You Begin")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole("button", { name: "Begin" })).toBeVisible();
  });

  test("dashboard shows after sign in", async ({ page }) => {
    // Sign in first
    await page.goto("/auth");
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    // Check dashboard components
    await expect(page.getByText("Today's Verse")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Weekly Check-In")).toBeVisible();
    await expect(page.getByText("Night Watch", { exact: true })).toBeVisible();
    await expect(page.getByText("The Seven Ways")).toBeVisible();
    await expect(page.getByText("The Three Fasts")).toBeVisible();
    await expect(page.getByText("Reading Progress")).toBeVisible();
  });

  test("admin page accessible after sign in", async ({ page }) => {
    // Sign in
    await page.goto("/auth");
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("**/dashboard", { timeout: 15000 });

    // Navigate to admin
    await page.goto("/admin");
    await expect(page.getByText("Command Center")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Total Crossings")).toBeVisible();
  });

  test("unauthenticated /dashboard redirects to /auth", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("**/auth**", { timeout: 10000 });
  });

  test("unauthenticated /admin redirects to /auth", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForURL("**/auth**", { timeout: 10000 });
  });
});
