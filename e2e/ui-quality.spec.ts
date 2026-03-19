import { test, expect } from "@playwright/test";

const pagesToCheck = ["/", "/manifesto", "/books", "/circle", "/auth"];

for (const path of pagesToCheck) {
  test(`${path} — all buttons have accessible labels`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(2000); // Wait for client hydration

    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent())?.trim();
      const ariaLabel = await btn.getAttribute("aria-label");
      expect(
        text || ariaLabel,
        `Button ${i} on ${path} has no accessible label`
      ).toBeTruthy();
    }
  });

  test(`${path} — no dead links`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(2000);

    const links = page.locator("a[href]");
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href, `Link ${i} on ${path} has empty href`).toBeTruthy();
      expect(href).not.toBe("#");
    }
  });

  test(`${path} — no horizontal scroll`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(2000);

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
}
