var fs = require('fs');

var writeStream = new fs.createWriteStream('dummy.txt');

writeStream.write("This is written from a writeLineIntoA_File");

writeStream.on('finish',function(){
    console.log("Writing Has Been Finished And Check The dummy File");
})

writeStream.on('error',function(err){
    console.log("Error"+err);
})

writeStream.end('This is The End');