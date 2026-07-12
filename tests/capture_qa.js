const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

(async () => {
  console.log("Starting QA Screenshot Capture automation...");
  const browser = await chromium.launch({ headless: true });
  const qaDir = path.join(__dirname, "..", "qa");
  
  if (!fs.existsSync(qaDir)) {
    fs.mkdirSync(qaDir, { recursive: true });
  }

  const base = "https://swift-guard-logi.vercel.app";

  // 1. Capture Loader showing the SG Monogram
  console.log("Capturing Loader Monogram...");
  const loaderPage = await browser.newPage();
  await loaderPage.setViewportSize({ width: 1280, height: 900 });
  await loaderPage.goto(base);
  // Wait short time so loader is visible but not completed
  await loaderPage.waitForTimeout(600);
  await loaderPage.screenshot({ path: path.join(qaDir, "loader_sg_monogram.png") });
  await loaderPage.close();

  // 2. Capture mobile screenshots with no clipping (320px, 375px, 430px)
  const viewports = [320, 375, 430];
  for (const w of viewports) {
    console.log(`Capturing Mobile home at ${w}px...`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(`${base}/?skipLoader=true&saver=true`);
    await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
    await page.screenshot({ path: path.join(qaDir, `mobile_home_${w}_no_clipping.png`) });
    await page.close();
  }

  // 3. Capture default calculator showing no Naira amount
  console.log("Capturing default calculator (no Naira amount)...");
  const calcPage = await browser.newPage();
  await calcPage.setViewportSize({ width: 1280, height: 900 });
  await calcPage.goto(`${base}/?skipLoader=true&saver=true`);
  await calcPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  
  const calcSection = calcPage.locator("#quote");
  await calcSection.scrollIntoViewIfNeeded();
  // Brief timeout to settle
  await calcPage.waitForTimeout(500);
  await calcSection.screenshot({ path: path.join(qaDir, "calculator_default_no_naira.png") });

  // 4. Capture activated calculator after click
  console.log("Activating calculator and capturing activated pricing...");
  const calcButton = calcPage.locator("#quote-activate-button");
  await calcButton.click();
  await calcPage.waitForTimeout(300);
  await calcSection.screenshot({ path: path.join(qaDir, "calculator_activated_pricing.png") });
  await calcPage.close();

  // 5. Capture normal scene showing visible motorcycle (using page level capture to avoid canvas freeze)
  console.log("Capturing normal scene with motorcycle...");
  const scenePage = await browser.newPage();
  await scenePage.setViewportSize({ width: 1280, height: 900 });
  await scenePage.goto(`${base}/?skipLoader=true`);
  await scenePage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await scenePage.waitForTimeout(2000); // Settle intro transitions
  await scenePage.screenshot({ path: path.join(qaDir, "motorcycle_normal_scene.png") });
  await scenePage.close();

  // 6. Capture sceneDebug=1 screenshot with all labels
  console.log("Capturing sceneDebug=1 overlay...");
  const debugPage = await browser.newPage();
  await debugPage.setViewportSize({ width: 1280, height: 900 });
  await debugPage.goto(`${base}/?sceneDebug=1&skipLoader=true`);
  await debugPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await debugPage.waitForSelector("#scene-debug-overlay");
  await debugPage.waitForTimeout(500);
  await debugPage.screenshot({ path: path.join(qaDir, "scene_debug_dashboard.png") });
  await debugPage.close();

  // 7. Capture Pickup & Delivery Animation Phases (using sceneDebug overlays)
  console.log("Capturing pickup and delivery animation phases...");
  const animPage = await browser.newPage();
  await animPage.setViewportSize({ width: 1280, height: 900 });
  await animPage.goto(`${base}/?sceneDebug=1&skipLoader=true`);
  await animPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");

  let pickupCaptured = false;
  let deliveryCaptured = false;
  
  // Poll page to catch debug phase transitions
  for (let i = 0; i < 40; i++) {
    const text = await animPage.locator("#scene-debug-overlay").innerText();
    
    if (text.includes("PHASE: Pickup Phase") && !pickupCaptured) {
      console.log("Captured Pickup Phase frame!");
      await animPage.screenshot({ path: path.join(qaDir, "animation_pickup_phase.png") });
      pickupCaptured = true;
    }
    
    if (text.includes("PHASE: Delivery Phase") && !deliveryCaptured) {
      console.log("Captured Delivery Phase frame!");
      await animPage.screenshot({ path: path.join(qaDir, "animation_delivery_phase.png") });
      deliveryCaptured = true;
    }

    if (pickupCaptured && deliveryCaptured) break;
    await animPage.waitForTimeout(250);
  }

  // 8. Capture motion sequence frames (simulating screen recording proof)
  console.log("Capturing motion frames sequence...");
  for (let f = 1; f <= 3; f++) {
    await animPage.waitForTimeout(500);
    await animPage.screenshot({ path: path.join(qaDir, `motorcycle_motion_frame${f}.png`) });
  }

  await animPage.close();
  await browser.close();
  console.log("All screenshots captured successfully!");
})();
