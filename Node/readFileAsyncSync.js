var fs = require('fs');

fs.readFile('dummy.txt',function(err,data){
    if(err){
        console.log('There is an error reading the data');
    }
    else{
        console.log('Asunchronous --> Data read from the file is :'+data);
    }
})

var dataSync = fs.readFileSync('dummy.txt');

console.log("synchronous --> Data from input.txt");