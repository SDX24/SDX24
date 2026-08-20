import { expect, test } from "@playwright/test";

test("hero leads with role, proof, and a primary action", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Full-stack developer/i);

  const hero = page.locator("section#top");
  await expect(hero.getByRole("link", { name: /View my work/i })).toBeVisible();
  await expect(hero.getByRole("link", { name: /Get in touch/i })).toBeVisible();
});

test("every section anchor exists and is reachable from the nav", async ({ page }) => {
  await page.goto("/");

  for (const id of ["work", "skills", "about", "contact"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }

  const nav = page.getByRole("navigation", { name: "Sections" }).first();
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("brand fonts actually load", async ({ page }) => {
  await page.goto("/");
  // Regression guard: the original woff2 files were HTML and silently failed to decode.
  await page.waitForFunction(() => document.fonts.status === "loaded");
  const loaded = await page.evaluate(() => ({
    display: document.fonts.check('700 48px "Space Grotesk"'),
    body: document.fonts.check('400 16px "IBM Plex Sans"'),
  }));
  expect(loaded.display).toBe(true);
  expect(loaded.body).toBe(true);
});

test("work is ordered RUDI first, then Tandem and InsurFlow", async ({ page }) => {
  await page.goto("/");

  const work = page.locator("section#work");
  await work.scrollIntoViewIfNeeded();

  const titles = await work.getByRole("heading", { level: 3 }).allTextContents();
  expect(titles[0]).toBe("RUDI");
  expect(titles.slice(1, 3).sort()).toEqual(["InsurFlow", "Tandem"]);
  expect(titles).not.toContain("Adult");

  for (const label of ["Problem", "Approach", "Outcome"]) {
    await expect(work.getByText(label, { exact: true }).first()).toBeVisible();
  }
});

test("the section nav tracks scroll position and does not stick", async ({ page }) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Sections" }).first();

  // ScrollToTopOnLoad resets scroll on mount, so scrolling before hydration gets undone.
  // scrollRestoration flips to "manual" in that same effect — a precise "it has run" signal.
  await page.waitForFunction(() => window.history.scrollRestoration === "manual");

  // Jump-scroll rather than scrollIntoViewIfNeeded: smooth scrolling makes Playwright wait
  // for stability on every step, which turned this test into minutes of wall clock.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });

  // Walk forwards then back; a stuck spy shows up as an aria-current that never moves.
  for (const id of ["work", "skills", "about", "contact", "skills", "work"]) {
    await page.evaluate((section) => {
      const target = document.getElementById(section);
      // offsetTop is relative to the offset parent, not the document.
      if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY + 8);
    }, id);
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "true");
  }
});

test("the Tandem case study is a real linkable page", async ({ page }) => {
  await page.goto("/work/tandem");

  await expect(page.getByRole("heading", { level: 1, name: "Tandem" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What I owned" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Live app/i }).first()).toBeVisible();
});

test("content is present without motion for reduced-motion users", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  // Reveal must never leave content stuck at opacity 0 when motion is disabled.
  const contact = page.locator("section#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("button", { name: /Copy address/i })).toBeVisible();
  await context.close();
});

test("contact section exposes a copyable email", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("section#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("link", { name: /stefandorosh24@gmail.com/i })).toBeVisible();
  await expect(contact.getByRole("button", { name: /Copy address/i })).toBeVisible();
});

test("a cold load of a deep link lands on the section", async ({ page }) => {
  await page.goto("/#contact");
  await page.waitForFunction(() => window.history.scrollRestoration === "manual");

  // Regression guard: ScrollToTopOnLoad used to yank shared deep links back to the top.
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
    .toBeGreaterThan(200);
});
