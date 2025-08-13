import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Command Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should open and close command menu", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    const dialog = page.locator(".command-dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should open with global keyboard shortcut", async ({ page }) => {
    await page.keyboard.press("Meta+k");

    const dialog = page.locator(".command-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should filter options based on input", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");
    await input.fill("home");

    const options = page.locator(".command-option");
    await expect(options).toHaveCount(1);
    await expect(options.first()).toContainText("Home");
  });

  test("should navigate with arrow keys", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    await page.keyboard.press("ArrowDown");
    let activeOption = page.locator('.command-option[data-active="true"]');
    await expect(activeOption).toContainText("Home");

    await page.keyboard.press("ArrowDown");
    activeOption = page.locator('.command-option[data-active="true"]');
    await expect(activeOption).toContainText("Search");

    await page.keyboard.press("ArrowUp");
    activeOption = page.locator('.command-option[data-active="true"]');
    await expect(activeOption).toContainText("Home");
  });

  test("should select option with Enter key", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    const dialog = page.locator(".command-dialog");
    await expect(dialog).not.toBeVisible();
  });

  test("should skip disabled options", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");
    await input.fill("delete");

    const option = page.locator(".command-option").first();
    await expect(option).toHaveAttribute("data-disabled", "true");

    await page.keyboard.press("ArrowDown");
    const activeOption = page.locator('.command-option[data-active="true"]');
    await expect(activeOption).toHaveCount(0);
  });

  test("should show empty state when no results", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");
    await input.fill("xyz123");

    await expect(page.locator("text=No results found")).toBeVisible();
  });

  test("should handle async loading", async ({ page }) => {
    await page.click('button:has-text("Open Async Command Menu")');

    await expect(page.locator("text=Loading commands...")).toBeVisible();

    await page.waitForSelector("text=Recent Files", { timeout: 2000 });

    const groups = page.locator(".command-group-heading");
    await expect(groups).toContainText(["Recent Files"]);
  });

  test("should support controlled input", async ({ page }) => {
    await page.click('button:has-text("Open Controlled Command Menu")');

    const input = page.locator(".command-input");
    await input.fill("test");

    await page.keyboard.press("Escape");

    await expect(page.locator('text=Current value: "test"')).toBeVisible();
  });

  test("should maintain focus on input", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");
    await expect(input).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(input).toBeFocused();
  });

  test("should wrap navigation at boundaries", async ({ page }) => {
    await page.click('button:has-text("Open Command Menu")');

    await page.keyboard.press("ArrowUp");

    const activeOption = page.locator('.command-option[data-active="true"]');
    await expect(activeOption).toContainText("Keyboard Shortcuts");
  });
});

test.describe("Accessibility", () => {
  test("should have no accessibility violations", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude(".command-overlay")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");
    await expect(input).toHaveAttribute("role", "combobox");
    await expect(input).toHaveAttribute("aria-expanded", "true");
    await expect(input).toHaveAttribute("aria-autocomplete", "list");

    const listbox = page.locator("#kmenu-listbox");
    await expect(listbox).toHaveAttribute("role", "listbox");

    const options = page.locator(".command-option").first();
    await expect(options).toHaveAttribute("role", "option");
  });

  test("should manage aria-activedescendant", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Open Command Menu")');

    const input = page.locator(".command-input");

    await page.keyboard.press("ArrowDown");

    const activeDescendant = await input.getAttribute("aria-activedescendant");
    expect(activeDescendant).toMatch(/^kmenu-option-/);

    const activeOption = page.locator(`#${activeDescendant}`);
    await expect(activeOption).toHaveAttribute("aria-selected", "true");
  });

  test("should support screen reader announcements", async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Open Async Command Menu")');

    const status = page.locator('[role="status"]');
    await expect(status).toHaveAttribute("aria-live", "polite");
    await expect(status).toHaveAttribute("aria-busy", "true");
  });
});
