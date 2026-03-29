import fs from 'fs';
const content = fs.readFileSync('prisma-error.log', 'utf16le');
fs.writeFileSync('prisma-error-ascii.txt', content, 'utf8');
