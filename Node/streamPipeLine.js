var  stream =require("stream");
var fs=require('fs');
var zlib=require('zlib');

stream.pipeline(
    fs.createReadStream('dummy.txt'),
    zlib.createGunzip(),
    fs.createWriteStream('dummy.tar.gz'),
    (err)=>{

        if(err){
            console.log("There is an error in the pipeline...");
        }
        else{
            console.log("pipeline write completed...");
        }
    }
)