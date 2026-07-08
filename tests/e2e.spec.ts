import { test, expect } from "@playwright/test";

test.describe("Swift Guard Logistics - E2E QA Verification", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");
    
    // Wait for cinematic loader to complete and set data-app-ready flag
    await page.waitForFunction(() => {
      return document.documentElement.getAttribute("data-app-ready") === "true";
    }, { timeout: 8000 });
  });

  test("Verify critical contact links and brand markings are present", async ({ page }) => {
    // 1. Verify Call Link Display & URI (use .first() to handle multiple header/contact buttons)
    const callButton = page.locator('a[href="tel:+2349030427190"]').first();
    await expect(callButton).toBeVisible();

    // 2. Verify WhatsApp Link Display & URI
    const whatsappLink = page.locator('a[href*="wa.me/2349137231057"]').first();
    await expect(whatsappLink).toBeVisible();

    // 3. Verify presence of Night Owl available text
    await expect(page.locator("body")).toContainText("NIGHT OWL DELIVERY AVAILABLE");

    // 4. Verify presence of Estimate footnote and disclaimers
    await expect(page.locator("body")).toContainText("Estimated quote pending confirmation");
    await expect(page.locator("body")).toContainText("For interface demonstration only. Final pricing is confirmed by Swift Guard Logistics.");
  });

  test("Verify unconfirmed operational claims DO NOT exist in document", async ({ page }) => {
    const content = await page.content();

    // Verify absence of unverified placeholders
    expect(content).not.toContain("24/7 Night Owl Patrol");
    expect(content).not.toContain("dispatch@swiftguardlogistics.com");
    expect(content).not.toContain("Plot 12 Cyber Plaza");
    expect(content).not.toContain("West Wing Hub");
    expect(content).not.toContain("East Industrial Node");
    expect(content).not.toContain("9:00 PM - 6:00 AM");
    expect(content).not.toContain("International: +2349137231057");
  });

  test("Verify core page routing and views", async ({ page }) => {
    // Navigate to dedicated Book page
    await page.goto("/book");
    await expect(page.locator("h1").first()).toContainText("Book a Delivery");
    await expect(page.locator("body")).toContainText("SECURE DISPATCH FORM");

    // Navigate to Track page
    await page.goto("/track?code=SGL-804219");
    await expect(page.locator("body")).toContainText("Command Center Tracking");

    // Navigate to Business page
    await page.goto("/business");
    await expect(page.locator("h2").first()).toContainText("Your Delivery Operations, Upgraded.");
  });
});
