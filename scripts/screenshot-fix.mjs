import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'images');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });

// 1. mylab — Flutter 웹앱 (로딩 대기 시간 늘림)
console.log('📸 mylab 재시도...');
try {
  await page.goto('file:///Users/binzzang/development/library%20app/app/web/index.html', { timeout: 30000 });
  await page.waitForTimeout(5000); // Flutter 부트스트랩 대기
  await page.screenshot({ path: path.join(outputDir, 'mylab.png') });
  console.log('  ✅ mylab.png');
} catch (e) {
  console.log('  ❌', e.message);
}

// 2. booksort — 번호 입력 탭으로 전환
console.log('📸 booksort 재시도 (번호 입력 탭)...');
try {
  await page.goto('https://booksort-rho.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  // "번호 입력" 탭 클릭
  const tab = page.getByText('번호 입력');
  if (await tab.count() > 0) {
    await tab.click();
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: path.join(outputDir, 'booksort.png') });
  console.log('  ✅ booksort.png');
} catch (e) {
  console.log('  ❌', e.message);
}

await browser.close();
console.log('\n완료!');
