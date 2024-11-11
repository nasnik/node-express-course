const path = require('path');

const pathToFile = path.join('C:/', 'Users/', 'Anastasia/', 'file.txt');
console.log(pathToFile);

console.log(path.sep);

const base = path.basename(pathToFile);
console.log(base);

const relative = path.relative('C:/','C:/Users/Anastasia/');
console.log(relative);

const absolute = path.resolve('C:/', 'Users/', 'Anastasia/');
console.log(absolute);