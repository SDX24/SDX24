import { expect, test } from "@playwright/test";

test("homepage displays SDX24", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /SDX24/i })).toBeVisible();
  await expect(page.getByText(/Portfolio Coming Soon/i)).toBeVisible();
});
