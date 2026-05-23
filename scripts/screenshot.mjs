import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'images');

const sites = [
  { name: 'mylab',    url: 'file:///Users/binzzang/development/library%20app/app/web/index.html', local: true },
  { name: 'wish',     url: 'https://lib-mid.vercel.app' },
  { name: 'librabook',url: 'https://librabook.vercel.app' },
  { name: 'haemil',   url: 'https://haemil-library.vercel.app' },
  { name: 'bookcheck',url: 'https://book-disposal.vercel.app' },
  { name: 'booksort', url: 'https://booksort-rho.vercel.app' },
  { name: 'bookreview', url: 'https://book-review-red-eta.vercel.app/login' },
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 }); // 모바일 뷰 (iPhone 14)

for (const site of sites) {
  console.log(`📸 ${site.name} 캡쳐 중... (${site.url})`);
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500); // 폰트/이미지 로딩 대기
    const outPath = path.join(outputDir, `${site.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`  ✅ 저장: images/${site.name}.png`);
  } catch (e) {
    console.log(`  ❌ 실패: ${e.message}`);
  }
}

await browser.close();
console.log('\n완료!');
