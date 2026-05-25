import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '..', 'index.html');
const imagesDir = path.join(__dirname, '..', 'images');

let html = fs.readFileSync(htmlPath, 'utf8');

const images = ['wish', 'librabook', 'haemil', 'bookcheck', 'booksort', 'bookreview'];

// 각 이미지를 파일 경로 OR 기존 data URL 패턴으로 찾되,
// 카드마다 고유한 주변 컨텍스트(data-card 속성)로 구분한다
for (const name of images) {
  const imgPath = path.join(imagesDir, `${name}.png`);
  const b64 = fs.readFileSync(imgPath).toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;

  // data-card="name" 속성이 있는 img 태그의 src만 교체
  // <img data-card="wish" src="images/wish.png" ...>
  // <img data-card="wish" src="data:image/png;base64,..." ...>
  const regex = new RegExp(
    `(<img\\s[^>]*data-card="${name}"[^>]*?)src="(?:images/${name}\\.png|data:image/png;base64,[^"]*)"`,
    'g'
  );
  const before = html;
  html = html.replace(regex, `$1src="${dataUrl}"`);

  if (html !== before) {
    console.log(`✅ ${name}.png 인라인 삽입 완료`);
  } else {
    // fallback: src="images/name.png" 단순 교체 시도
    const simpleRegex = new RegExp(`src="images/${name}\\.png"`, 'g');
    html = html.replace(simpleRegex, `src="${dataUrl}"`);
    console.log(`✅ ${name}.png 인라인 삽입 완료 (fallback)`);
  }
}

fs.writeFileSync(htmlPath, html);
console.log('\n완료! index.html 업데이트됨');
