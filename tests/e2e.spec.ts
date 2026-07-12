import { test, expect } from "@playwright/test";

test.describe("Swift Guard Logistics - E2E Production Quality Assurance", () => {
  
  test.describe("Homepage Content Integrity Checks", () => {
    test.beforeEach(async ({ page }) => {
      // Append skipLoader=true and saver=true to bypass animation wait and load lightweight static scene
      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => {
        return document.documentElement.getAttribute("data-app-ready") === "true";
      }, { timeout: 8000 });
    });

    test("Verify critical dispatch contact references", async ({ page }) => {
      // Call number & tel: link format
      const callLink = page.locator('a[href="tel:+2349030427190"]').first();
      await expect(callLink).toBeVisible();

      // WhatsApp number & wa.me link format
      const whatsappLink = page.locator('a[href*="wa.me/2349137231057"]').first();
      await expect(whatsappLink).toBeVisible();

      // Verified text indicator
      await expect(page.locator("body")).toContainText("NIGHT OWL DELIVERY AVAILABLE");
    });

    test("Ensure unverified claims do not exist on homepage", async ({ page }) => {
      const content = await page.content();
      
      // Fictional office metadata must be absent
      expect(content).not.toContain("24/7 Night Owl Patrol");
      expect(content).not.toContain("dispatch@swiftguardlogistics.com");
      expect(content).not.toContain("Plot 12 Cyber Plaza");
      expect(content).not.toContain("West Wing Hub");
      expect(content).not.toContain("East Industrial Node");
      expect(content).not.toContain("9:00 PM - 6:00 AM");
      expect(content).not.toContain("International: +2349137231057");
    });

    test("Assert obsolete phrases are removed and replaced", async ({ page }) => {
      const content = await page.content();

      // Verify game-like phrasing is gone
      expect(content).not.toContain("MISSION SELECTOR");
      expect(content).not.toContain("Start This Mission");
      expect(content).not.toContain("Configure Mission Parameters");
      expect(content).not.toContain("Book Delivery Mission");
      expect(content).not.toContain("MISSION DESK");
      expect(content).not.toContain("Command Center Demo");
      
      // Verify "real-time" claims are removed or qualified
      expect(content).not.toContain("real-time status visibility");
      expect(content).not.toContain("Real-time safety command center tracking");
      expect(content).not.toContain("Real-time dispatch alert notifications");
    });
  });

  test.describe("Quote Calculator Activation Flows", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => {
        return document.documentElement.getAttribute("data-app-ready") === "true";
      }, { timeout: 8000 });
    });

    test("Verify calculator defaults to no naira figures", async ({ page }) => {
      // Scroll to calculator
      const calculatorHeader = page.locator("#quote");
      await calculatorHeader.scrollIntoViewIfNeeded();

      // Estimate field should display placeholder em-dash
      const estimateText = page.locator("#quote-estimate-value");
      await expect(estimateText).toContainText("—");
      
      // Table cells should be placeholders em-dash
      const baseRateText = page.locator("#quote-base-rate");
      await expect(baseRateText).toContainText("—");
      
      const sizeFactorText = page.locator("#quote-size-factor");
      await expect(sizeFactorText).toContainText("—");

      // Verify the CTA button is 'Calculate Rate' and not the booking link
      const activateButton = page.locator("#quote-activate-button");
      await expect(activateButton).toBeVisible();
      await expect(activateButton).toContainText("Calculate Rate");
    });

    test("Verify calculator displays active pricing after activation click", async ({ page }) => {
      const calculatorHeader = page.locator("#quote");
      await calculatorHeader.scrollIntoViewIfNeeded();

      // Click calculate button
      const activateButton = page.locator("#quote-activate-button");
      await activateButton.click();

      // Naira figures should now be generated
      const estimateText = page.locator("#quote-estimate-value");
      await expect(estimateText).toContainText("₦");

      const baseRateText = page.locator("#quote-base-rate");
      await expect(baseRateText).toContainText("₦");

      const sizeFactorText = page.locator("#quote-size-factor");
      await expect(sizeFactorText).toContainText("1.0");

      // Booking link is revealed
      const bookLink = page.locator("#quote-book-link");
      await expect(bookLink).toBeVisible();
    });
  });

  test.describe("Scene Diagnosis Overlay Checks", () => {
    test("Verify sceneDebug=1 reveals active diagnostics dashboard", async ({ page }) => {
      // Navigate with debug param & bypass loader
      await page.goto("/?sceneDebug=1&skipLoader=true");
      
      await page.waitForFunction(() => {
        return document.documentElement.getAttribute("data-app-ready") === "true";
      }, { timeout: 8000 });

      // Check debug info container
      const debugOverlay = page.locator("#scene-debug-overlay");
      await expect(debugOverlay).toBeVisible();
      await expect(debugOverlay).toContainText("Scene Debug Proof");
      await expect(debugOverlay).toContainText("ANIMATION PHASE");
      await expect(debugOverlay).toContainText("RIDER RATE");
    });
  });

  test.describe("Page Navigation and Routing Checks", () => {
    test("Assert subpage loading and layouts", async ({ page }) => {
      // Dedicated Booking page
      await page.goto("/book?skipLoader=true");
      await expect(page.locator("h1").first()).toContainText("Book a Delivery");
      await expect(page.locator("body")).toContainText("SECURE DISPATCH FORM");

      // Tracking page
      await page.goto("/track?code=SGL-804219&skipLoader=true");
      await expect(page.locator("body")).toContainText("Command Center Tracking");

      // Business page
      await page.goto("/business?skipLoader=true");
      await expect(page.locator("h2").first()).toContainText("Your Delivery Operations, Upgraded.");
    });
  });
});
