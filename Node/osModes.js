var os = require('os');

console.log("OS Architect :- "+ os.arch());
console.log();
console.log("Number Of Cpu's"+ JSON.stringify(os.cpus()))
console.log();
console.log("Free Memory In Bytes" + os.freemem())