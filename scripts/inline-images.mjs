import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '..', 'index.html');
const imagesDir = path.join(__dirname, '..', 'images');

let html = fs.readFileSync(htmlPath, 'utf8');

const images = ['wish', 'librabook', 'haemil', 'bookcheck', 'booksort', 'bookreview'];

for (const name of images) {
  const imgPath = path.join(imagesDir, `${name}.png`);
  const b64 = fs.readFileSync(imgPath).toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;
  html = html.replace(`src="images/${name}.png"`, `src="${dataUrl}"`);
  console.log(`✅ ${name}.png 인라인 삽입 완료`);
}

fs.writeFileSync(htmlPath, html);
console.log('\n완료! index.html 업데이트됨');
