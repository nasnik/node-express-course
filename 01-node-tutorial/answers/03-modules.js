const {name, age, address}  = require('./04-names');
const greeting = require('./05-utils');
const data = require('./06-alternative-flavor');

console.log(data);
greeting(name, age, address);