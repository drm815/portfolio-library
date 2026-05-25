import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pyScript = join(__dirname, 'inline-images.py');

execSync(`python3 "${pyScript}"`, { stdio: 'inherit' });
