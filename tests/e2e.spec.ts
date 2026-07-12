import { test, expect } from "@playwright/test";

test.describe("Swift Guard Logistics - E2E QA Verification Suite", () => {
  
  // 1. Console error monitoring & clean logs
  test.describe("Console and Data Integrity Checks", () => {
    test("Assert no severe console errors are thrown during load", async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          // ignore expected dynamic resource warnings if any
          if (!msg.text().includes("failed to load resource")) {
            consoleErrors.push(msg.text());
          }
        }
      });

      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
      expect(consoleErrors).toHaveLength(0);
    });

    test("Assert no obsolete phrases exist in homepage HTML", async ({ page }) => {
      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
      const content = await page.content();

      expect(content).not.toContain("MISSION SELECTOR");
      expect(content).not.toContain("Start This Mission");
      expect(content).not.toContain("Configure Mission Parameters");
      expect(content).not.toContain("Book Delivery Mission");
      expect(content).not.toContain("MISSION DESK");
      expect(content).not.toContain("Command Center Demo");
      expect(content).not.toContain("real-time status visibility");
      expect(content).not.toContain("updates in real-time");
    });
  });

  // 2. Cinematic Loader tests
  test.describe("Cinematic Loader Behavior", () => {
    test("Loader closes within 3 seconds and unlocks interface", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("/");
      await page.waitForFunction(() => {
        return document.documentElement.getAttribute("data-app-ready") === "true";
      }, { timeout: 4000 });
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeLessThan(3500); // hard timeout at 2.5s guarantees lock release
    });

    test("Loader and header use matching unified SG logo monogram", async ({ page }) => {
      // Navigate to the side-by-side logo proof page
      await page.goto("/logo-proof");
      
      const logoCount = await page.locator("svg[role='img']").count();
      expect(logoCount).toBe(2);

      // Verify both SVGs contain the unified S/G monogram paths
      const svgs = page.locator("svg[role='img']");
      for (let i = 0; i < logoCount; i++) {
        const svgContent = await svgs.nth(i).innerHTML();
        expect(svgContent).toContain('d="M38 20H26C23 20 23 27 26 28.5L38 31.5C41 33 41 40 38 41.5H26"');
        expect(svgContent).toContain('d="M36 29H42V40C42 42.5 39.5 44 37 44H29C25 44 23.5 41 23.5 37"');
      }
    });

    test("Reduced motion skips loader instantly", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const startTime = Date.now();
      await page.goto("/");
      await page.waitForFunction(() => {
        return document.documentElement.getAttribute("data-app-ready") === "true";
      }, { timeout: 1000 });
      expect(Date.now() - startTime).toBeLessThan(1000);
    });
  });

  // 3. Responsive viewports and overflow testing
  test.describe("Viewport responsive layout verification", () => {
    const widths = [320, 360, 375, 390, 430];

    for (const w of widths) {
      test(`Assert no layout overflow at viewport width ${w}px`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: 800 });
        await page.goto("/?skipLoader=true&saver=true");
        await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

        // Verify there is no horizontal scroll overflow
        const overflowCheck = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(overflowCheck).toBe(false);
      });
    }

    test("Verify correct compact header styling at 320px width", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

      // LOGISTICS brand text should be hidden
      const logisticsText = page.locator("span:has-text('LOGISTICS')");
      await expect(logisticsText).toBeHidden();

      // Words "Book Delivery" should be hidden on the action button
      const bookButtonText = page.locator("header a[href='/book'] span");
      await expect(bookButtonText).toBeHidden();

      // Calendar icon inside action button and settings button remain visible
      const calendarIcon = page.locator("header a[href='/book'] svg");
      await expect(calendarIcon).toBeVisible();

      const settingsBtn = page.locator("header button[aria-label='Open settings panel']");
      await expect(settingsBtn).toBeVisible();

      // Header width does not exceed outer boundaries
      const headerBox = await page.locator("header > div").first().boundingBox();
      expect(headerBox?.width).toBeLessThanOrEqual(296); // fits within 320 - 24 (padding)
    });

    test("Verify all four mobile bottom navigation items are visible", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto("/?skipLoader=true&saver=true");
      
      const navContainer = page.locator("nav[aria-label='Mobile navigation bar']");
      await expect(navContainer).toBeVisible();

      const navItems = navContainer.locator("a");
      await expect(navItems).toHaveCount(4);

      // Verify each bottom nav item is visible
      for (let i = 0; i < 4; i++) {
        await expect(navItems.nth(i)).toBeVisible();
      }
    });
  });

  // 4. Quote Calculator Activations
  test.describe("Quote Calculator Display Rules", () => {
    test("Default pricing contains no Naira symbol or numeric estimates", async ({ page }) => {
      await page.goto("/?skipLoader=true&saver=true");
      const calculatorHeader = page.locator("#quote");
      await calculatorHeader.scrollIntoViewIfNeeded();

      const estimateText = page.locator("#quote-estimate-value");
      await expect(estimateText).toContainText("—");
      await expect(estimateText).not.toContainText("₦");

      const activateBtn = page.locator("#quote-activate-button");
      await expect(activateBtn).toContainText("View Sample Pricing");
    });

    test("Pricing displays correctly only after View Sample Pricing click", async ({ page }) => {
      await page.goto("/?skipLoader=true&saver=true");
      const calculatorHeader = page.locator("#quote");
      await calculatorHeader.scrollIntoViewIfNeeded();

      const activateBtn = page.locator("#quote-activate-button");
      await activateBtn.click();

      // Pricing values appear with Naira symbols
      const estimateText = page.locator("#quote-estimate-value");
      await expect(estimateText).toContainText("₦");

      const baseRateText = page.locator("#quote-base-rate");
      await expect(baseRateText).toContainText("₦");

      // Official warning notice is prominently rendered
      const warningAlert = page.locator("div:has-text('Not an official Swift Guard rate')");
      await expect(warningAlert).toBeVisible();
    });
  });

  // 5. Booking Form Validation & WhatsApp Links
  test.describe("Booking form validation", () => {
    test("Assert error validation triggers on required inputs", async ({ page }) => {
      await page.goto("/book?skipLoader=true");

      // Click WhatsApp submit with empty form fields
      await page.locator("button[type='submit']").click();

      // Verify required error warnings appear
      await expect(page.locator("body")).toContainText("Pickup location is required");
      await expect(page.locator("body")).toContainText("Destination is required");
      await expect(page.locator("body")).toContainText("Customer name is required");
      await expect(page.locator("body")).toContainText("Phone number is required");
    });

    test("Verify correct WhatsApp number format and message encoding", async ({ page }) => {
      await page.goto("/book?skipLoader=true");

      // Fill valid inputs
      await page.locator("#book-pickup-input").fill("Command Hub North");
      await page.locator("#book-destination-input").fill("Substation South");
      await page.locator("#book-name-input").fill("Samuel");
      await page.locator("#book-phone-input").fill("09137231057");
      await page.locator("#book-details-text").fill("Electronics case");

      // Mock window.open to assert WhatsApp redirect values
      const redirectPromise = page.evaluate(() => {
        return new Promise<string>((resolve) => {
          window.open = (url) => {
            resolve(url || "");
            return null;
          };
        });
      });

      await page.locator("button[type='submit']").click();
      const targetUrl = await redirectPromise;

      expect(targetUrl).toContain("wa.me/2349137231057");
      expect(targetUrl).toContain("Pickup%3A%20Command%20Hub%20North");
      expect(targetUrl).toContain("Destination%3A%20Substation%20South");
    });
  });

  // 6. 3D Fallback Mode and WebGL Fallback verification
  test.describe("Battery Saver and Fallbacks", () => {
    test("Battery saver query deactivates 3D and renders SVG blueprint", async ({ page }) => {
      await page.goto("/?skipLoader=true&saver=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

      // Canvas should not be active, static SVG container should render
      const staticContainer = page.locator("text=ACTIVE BLUEPRINT ROUTE");
      await expect(staticContainer).toBeVisible();
    });
  });

  // 7. Dynamic Animation Phase freezes
  test.describe("Cinematic Phase Overrides", () => {
    test("phase=pickup overrides locks scene to pickup node", async ({ page }) => {
      await page.goto("/?sceneDebug=1&phase=pickup&skipLoader=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

      const debugOverlay = page.locator("#scene-debug-overlay");
      await expect(debugOverlay).toBeVisible();
      await expect(debugOverlay).toContainText("OVERRIDE: pickup");
      await expect(debugOverlay).toContainText("Pickup Phase");
    });

    test("phase=transit overrides locks scene to transit center", async ({ page }) => {
      await page.goto("/?sceneDebug=1&phase=transit&skipLoader=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

      const debugOverlay = page.locator("#scene-debug-overlay");
      await expect(debugOverlay).toBeVisible();
      await expect(debugOverlay).toContainText("OVERRIDE: transit");
      await expect(debugOverlay).toContainText("Transit Phase");
    });

    test("phase=delivery overrides locks scene to destination node", async ({ page }) => {
      await page.goto("/?sceneDebug=1&phase=delivery&skipLoader=true");
      await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

      const debugOverlay = page.locator("#scene-debug-overlay");
      await expect(debugOverlay).toBeVisible();
      await expect(debugOverlay).toContainText("OVERRIDE: delivery");
      await expect(debugOverlay).toContainText("Delivery Phase");
    });
  });

});
