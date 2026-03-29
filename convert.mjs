import fs from 'fs';
const content = fs.readFileSync('pnpm-install.log', 'utf16le');
fs.writeFileSync('pnpm-install-ascii.txt', content, 'utf8');
