import { test, expect } from "@playwright/test";

const publicPages = [
  { path: "/", title: "A Covenant Community" },
  { path: "/manifesto", title: "Why We Return" },
  { path: "/books", title: "The Sacred Texts" },
  { path: "/circle", title: "Not Alone" },
  { path: "/crossing", title: "Before You Begin" },
  { path: "/auth", title: "Welcome Back" },
];

for (const page of publicPages) {
  test(`${page.path} loads and contains expected content`, async ({
    page: p,
  }) => {
    await p.goto(page.path);
    await expect(p.getByText(page.title, { exact: false })).toBeVisible({
      timeout: 15000,
    });
  });
}

test("404 page shows You Have Drifted", async ({ page }) => {
  await page.goto("/this-does-not-exist");
  await expect(page.getByText("You Have Drifted")).toBeVisible({
    timeout: 10000,
  });
});

test("home page has all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("The Seven Ways")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("Receive the First Chapter")).toBeVisible();
  await expect(page.getByText("Light over Fog.").first()).toBeVisible();
});

test("books page shows both books", async ({ page }) => {
  await page.goto("/books");
  await expect(page.getByText("The Book of Returning")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("The Teachings of the Returned")).toBeVisible();
  await expect(page.getByText("7 Chapters")).toBeVisible();
  await expect(page.getByText("18 Chapters")).toBeVisible();
});

test("book reader loads Chapter I", async ({ page }) => {
  await page.goto("/books/one");
  await expect(page.getByText("Chapter I", { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("The First Light").first()).toBeVisible();
});

test("manifesto has covenant block", async ({ page }) => {
  await page.goto("/manifesto");
  await expect(page.getByText("The Covenant")).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByText("I will speak the truth", { exact: false })
  ).toBeVisible();
});

test("circle page shows 7 roles", async ({ page }) => {
  await page.goto("/circle");
  await expect(page.getByText("Keeper of Silence")).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByText("Keeper of Returning")).toBeVisible();
});
