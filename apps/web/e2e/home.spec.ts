import { devices, expect, test } from "@playwright/test";

test("homepage displays Stefan Dorosh portfolio", async ({ page }) => {
  await page.goto("/");

  // Check name is visible
  await expect(page.getByRole("heading", { name: /Stefan Dorosh/i })).toBeVisible();

  // Check title is visible
  await expect(page.getByText("Full-Stack Web Developer", { exact: true })).toBeVisible();

  // Check CTA buttons exist
  await expect(page.getByRole("link", { name: /View GitHub/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/i })).toBeVisible();

  // Check status badges
  await expect(page.getByText(/Open to fall 2026 internships/i)).toBeVisible();
  await expect(page.getByText(/Vancouver, BC/i)).toBeVisible();
});

test("InsurFlow opens fullscreen after sustained hover", async ({ page }) => {
  await page.goto("/");

  const focusCard = page.locator('[data-focus-card="insurflow"]');
  const fullscreenLayer = page.locator('[data-focus-fullscreen="insurflow"]');

  await focusCard.scrollIntoViewIfNeeded();
  await focusCard.hover();

  await expect(fullscreenLayer).toBeVisible({ timeout: 6000 });
  await expect(page.locator('[data-focus-back="insurflow"]')).toBeVisible();
});

test("InsurFlow priming cancels when hover ends early", async ({ page }) => {
  await page.goto("/");

  const focusCard = page.locator('[data-focus-card="insurflow"]');
  const fullscreenLayer = page.locator('[data-focus-fullscreen="insurflow"]');

  await focusCard.scrollIntoViewIfNeeded();
  await focusCard.hover();
  await page.waitForTimeout(750);
  await page.mouse.move(10, 10);
  await page.waitForTimeout(2600);

  await expect(fullscreenLayer).toHaveCount(0);
  await expect(page.locator('[data-focus-priming-overlay="insurflow"]')).toHaveCount(0);
});

test("InsurFlow closes back to card from fullscreen", async ({ page }) => {
  await page.goto("/");

  const focusCard = page.locator('[data-focus-card="insurflow"]');
  const fullscreenLayer = page.locator('[data-focus-fullscreen="insurflow"]');
  const backButton = page.locator('[data-focus-back="insurflow"]');

  await focusCard.scrollIntoViewIfNeeded();
  await focusCard.hover();
  await expect(fullscreenLayer).toBeVisible({ timeout: 6000 });

  await backButton.click();
  await expect(fullscreenLayer).toHaveCount(0);
  await expect(focusCard).toBeVisible();
});

test("InsurFlow opens fullscreen after tap countdown on touch devices", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    baseURL,
  });
  const page = await context.newPage();

  await page.goto("/");

  const focusCard = page.locator('[data-focus-card="insurflow"]');
  const fullscreenLayer = page.locator('[data-focus-fullscreen="insurflow"]');

  await focusCard.scrollIntoViewIfNeeded();
  await focusCard.tap();

  await expect(fullscreenLayer).toBeVisible({ timeout: 6000 });
  await expect(page.locator('[data-focus-back="insurflow"]')).toBeVisible();

  await context.close();
});
