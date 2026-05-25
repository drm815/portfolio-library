import re, base64, os, sys

script_dir = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(script_dir, '..', 'index.html')
images_dir = os.path.join(script_dir, '..', 'images')

with open(html_path, 'r') as f:
    html = f.read()

images = ['wish', 'librabook', 'haemil', 'bookcheck', 'booksort', 'bookreview']
pattern = re.compile(r'(<img\s+)src="(?:images/\w+\.png|data:image/png;base64,[^"]*?)"')
matches = list(pattern.finditer(html))

if len(matches) != len(images):
    print(f'ERROR: img 태그 {len(matches)}개, 이미지 {len(images)}개 — 개수 불일치')
    sys.exit(1)

result = html
for i in reversed(range(len(images))):
    m = matches[i]
    name = images[i]
    with open(os.path.join(images_dir, f'{name}.png'), 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    new_src = m.group(1) + f'src="data:image/png;base64,{b64}"'
    result = result[:m.start()] + new_src + result[m.end():]
    print(f'✅ {name}.png 인라인 삽입 완료')

with open(html_path, 'w') as f:
    f.write(result)

print('\n완료! index.html 업데이트됨')
