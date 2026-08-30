/**
 * 分段截图脚本：用系统 Edge 无头渲染 dist 构建产物，输出供视觉验收的分段 PNG。
 * 用法：node scripts/capture.mjs
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const OUT = new URL('../.review/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:4321';
const pages = [
  { url: '/', prefix: 'v2-projects-desktop-x', width: 1440, vh: 1800 },
];

const pages2 = [
  { url: '/projects', prefix: 'v2-projects-desktop', width: 1440, vh: 1800 },
  { url: '/projects/legal-knowledge-graphrag', prefix: 'v2-graphrag-desktop', width: 1440, vh: 1800 },
  { url: '/projects/low-altitude-target-recognition', prefix: 'v2-lowalt-desktop', width: 1440, vh: 1800 },
  { url: '/projects/multimodal-interference-recognition', prefix: 'v2-interf-desktop', width: 1440, vh: 1800 },
  { url: '/about', prefix: 'v2-about-desktop', width: 1440, vh: 1800 },
];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

async function capture({ url, prefix, width, vh }) {
  await page.setViewportSize({ width, height: vh });
  await page.goto(BASE + url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  // 滚动一遍触发懒加载
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.floor(vh * 0.8)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const positions = [];
  for (let y = 0; y < H - vh; y += vh) positions.push(y);
  positions.push(H - vh);
  let n = 0;
  for (const y of positions) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}${prefix}-${String(n).padStart(2, '0')}.png` });
    n++;
  }
  return { url, H, segments: n };
}

const results = [];
for (const p of pages2) {
  results.push(await capture(p));
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
