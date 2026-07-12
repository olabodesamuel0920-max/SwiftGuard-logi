const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

(async () => {
  console.log("Starting Phase 1D.2 QA Screenshot Capture automation...");
  const browser = await chromium.launch({ headless: true });
  const qaDir = path.join(__dirname, "..", "qa");
  
  if (!fs.existsSync(qaDir)) {
    fs.mkdirSync(qaDir, { recursive: true });
  }

  // Base Vercel or local URL
  const base = "https://swift-guard-logi.vercel.app";

  // 1. Capture Loader showing the SG Monogram
  console.log("Capturing Loader Monogram...");
  const loaderPage = await browser.newPage();
  await loaderPage.setViewportSize({ width: 1280, height: 900 });
  await loaderPage.goto(base);
  await loaderPage.waitForTimeout(600); // Capture mid-loading sequence
  await loaderPage.screenshot({ path: path.join(qaDir, "loader_sg_monogram.png") });
  await loaderPage.close();

  // 2. Capture Logo Proof Subpage Side-by-Side
  console.log("Capturing Logo Proof side-by-side...");
  const proofPage = await browser.newPage();
  await proofPage.setViewportSize({ width: 1280, height: 800 });
  await proofPage.goto(`${base}/logo-proof`);
  await proofPage.waitForTimeout(1000);
  await proofPage.screenshot({ path: path.join(qaDir, "logo_proof_side_by_side.png") });
  await proofPage.close();

  // 3. Capture mobile screenshots with no clipping (320px, 375px, 430px)
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

  // 4. Capture default calculator showing no Naira amount
  console.log("Capturing default calculator (no Naira amount)...");
  const calcPage = await browser.newPage();
  await calcPage.setViewportSize({ width: 1280, height: 900 });
  await calcPage.goto(`${base}/?skipLoader=true&saver=true`);
  await calcPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  
  const calcSection = calcPage.locator("#quote");
  await calcSection.scrollIntoViewIfNeeded();
  await calcPage.waitForTimeout(500);
  await calcSection.screenshot({ path: path.join(qaDir, "calculator_default_no_naira.png") });

  // 5. Capture activated calculator after click (showing "View Sample Pricing")
  console.log("Activating calculator and capturing activated pricing...");
  const calcButton = calcPage.locator("#quote-activate-button");
  await calcButton.click();
  await calcPage.waitForTimeout(500);
  await calcSection.screenshot({ path: path.join(qaDir, "calculator_activated_pricing.png") });
  await calcPage.close();

  // 6. Capture normal scene showing enlarged motorcycle
  console.log("Capturing normal scene with motorcycle...");
  const scenePage = await browser.newPage();
  await scenePage.setViewportSize({ width: 1280, height: 900 });
  await scenePage.goto(`${base}/?skipLoader=true`);
  await scenePage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await scenePage.waitForTimeout(2500); // wait for camera easing intro to complete
  await scenePage.screenshot({ path: path.join(qaDir, "motorcycle_normal_scene.png") });
  await scenePage.close();

  // 7. Capture sceneDebug=1 screenshot showing leader lines pointing to paused models
  console.log("Capturing sceneDebug=1 overlay...");
  const debugPage = await browser.newPage();
  await debugPage.setViewportSize({ width: 1280, height: 900 });
  await debugPage.goto(`${base}/?sceneDebug=1&skipLoader=true`);
  await debugPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await debugPage.waitForSelector("#scene-debug-overlay");
  await debugPage.waitForTimeout(1000); // let 3D render settle
  await debugPage.screenshot({ path: path.join(qaDir, "scene_debug_dashboard.png") });
  await debugPage.close();

  // 8. Capture frozen animation phases (?phase=pickup, ?phase=transit, ?phase=delivery)
  const phases = ["pickup", "transit", "delivery"];
  for (const phase of phases) {
    console.log(`Capturing phase=${phase} override...`);
    const animPage = await browser.newPage();
    await animPage.setViewportSize({ width: 1280, height: 900 });
    await animPage.goto(`${base}/?sceneDebug=1&phase=${phase}&skipLoader=true`);
    await animPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
    await animPage.waitForTimeout(1500); // let WebGL render finish drawing the parcel
    await animPage.screenshot({ path: path.join(qaDir, `animation_${phase}_phase.png`) });
    await animPage.close();
  }

  // 9. Capture sequential motion frames for animation proof
  console.log("Capturing motion frames sequence...");
  const motionPage = await browser.newPage();
  await motionPage.setViewportSize({ width: 1280, height: 900 });
  await motionPage.goto(`${base}/?skipLoader=true`);
  await motionPage.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await motionPage.waitForTimeout(2500); // wait for intro to end

  for (let f = 1; f <= 3; f++) {
    await motionPage.waitForTimeout(600);
    await motionPage.screenshot({ path: path.join(qaDir, `motorcycle_motion_frame${f}.png`) });
  }
  await motionPage.close();

  await browser.close();
  console.log("All Phase 1D.2 screenshots captured successfully!");
})();
