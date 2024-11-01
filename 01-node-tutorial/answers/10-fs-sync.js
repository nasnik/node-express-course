const { readFileSync, writeFileSync } = require('fs');

const path = './temporary/fileA.txt';

writeFileSync(path, 'First line. \n');
writeFileSync(path, 'Second line. \n', { flag: 'a' });
writeFileSync(path, 'Third line. \n', { flag: 'a' });

const readFileA = readFileSync(path, 'utf8');
console.log(readFileA);