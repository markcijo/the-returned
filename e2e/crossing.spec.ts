import { test, expect } from "@playwright/test";

test("crossing flow — intro screen shows before ritual", async ({ page }) => {
  await page.goto("/crossing");
  await expect(page.getByText("Before You Begin")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("Silence")).toBeVisible();
  await expect(page.getByText("Water")).toBeVisible();
  await expect(page.getByText("Word")).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin" })).toBeVisible();
});

test("crossing flow — Begin leads to silence countdown", async ({ page }) => {
  await page.goto("/crossing");
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByText("Step One — Silence")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText(/[01]:\d{2}/)).toBeVisible();
});

test("crossing flow — no skip in first seconds of silence", async ({
  page,
}) => {
  await page.goto("/crossing");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.waitForTimeout(3000);
  const continueBtn = page.getByText("Continue");
  await expect(continueBtn).not.toBeVisible();
});
