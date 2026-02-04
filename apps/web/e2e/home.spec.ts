import { expect, test } from "@playwright/test";

test("homepage displays Stefan Dorosh portfolio", async ({ page }) => {
  await page.goto("/");

  // Check name is visible
  await expect(page.getByRole("heading", { name: /Stefan Dorosh/i })).toBeVisible();

  // Check title is visible
  await expect(page.getByText(/Full[-\s]Stack Web Developer/i)).toBeVisible();

  // Check CTA buttons exist
  await expect(page.getByRole("link", { name: /View GitHub/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/i })).toBeVisible();

  // Check featured projects section
  await expect(page.getByRole("heading", { name: /Featured Projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Tandem/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /InsurFlow/i })).toBeVisible();
});
