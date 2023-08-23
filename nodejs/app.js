// function sayHello(name){
//     globalThis.console.log("hello : " + name);
// }

// sayHello("ilyas"); 
const logger = require('./logger.js');
logger.log('hello world');

console.log('-----------------');

const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);



const os = require('os');
let Totalmem = os.totalmem();
let freeMemory = os.freemem();

console.log('total memory is : ' + Totalmem);
globalThis.console.log(`Free memory is : ${freeMemory}`);