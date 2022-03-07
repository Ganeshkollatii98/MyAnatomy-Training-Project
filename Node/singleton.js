// var singleton=(function(){
//     var instance;

//     return {
//         getInstance:function(){
//             console.log("\n\nRequest to get  instance of the object..");
//             if(!instance)
//             {
//                  console.log("inside if condation...")
//                  instance=new Object("this is the new instance");
//             }
//             return instance;
//         }
//     }
// })();
// console.log("instance1")
// var instance1=singleton.getInstance();
// console.log("instance2")
// var instance2=singleton.getInstance();



var singleTon=(function(){
     
    var instance;
    return {
        getInstance: function(){
            if(!instance){
                instance=new Object("created singlton object");
            }
            return instance;
        }
    }
})

