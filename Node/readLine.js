var fs = require('fs');

var data = '';

var readStream = new fs.createReadStream('dummy.txt');

readStream.on('data',function(readData){
    data = readData
})

readStream.on('end',function(){
    console.log("Read data:"+data);
})

readStream.on('error',function(err){
    console.log('Some error occoured reading file'+err);
})

