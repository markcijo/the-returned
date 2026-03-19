import { test, expect } from "@playwright/test";

test("crossing flow — silence step renders with countdown", async ({
  page,
}) => {
  await page.goto("/crossing");
  await expect(page.getByText("Step One — Silence")).toBeVisible({
    timeout: 10000,
  });
  // Timer should show 1:00 or 0:59
  await expect(page.getByText(/[01]:\d{2}/)).toBeVisible();
});

test("crossing flow — no skip before 60s", async ({ page }) => {
  await page.goto("/crossing");
  await page.waitForTimeout(3000);
  // "Continue" button should NOT be visible in first 30 seconds
  const continueBtn = page.getByText("Continue");
  await expect(continueBtn).not.toBeVisible();
});
