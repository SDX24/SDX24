import { expect, test } from "@playwright/test";

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
