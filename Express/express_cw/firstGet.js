const express=require('express');
const app=express();
const port=8000;

app.get("/hello",(request,responce)=>{
  responce.send("hello from server.. my first script from server")
})
app.get("/login",(request,responce)=>{
     console.log("In the /login of express");
     console.log(request.status);
     var uid=request.query.uid;
     var pwd=request.query.pwd;

     strData=`Given data is :UID ${uid} and password:${pwd}`
     console.log(strData);

     var strResult="You are not a valid user, please check the credentials";

     if(uid=="Ganesh" && pwd=="Gani@1998")
     {
         strResult="You are a valid user , welcome "+uid;
         console.log(strResult);
     }
     responce.send(strResult)
})

// for post method we need to use body parser 
// and we wont be see in rul for sercurity purpose we are using this
app.use(express.json())
app.post('/loginPost',(request,responce)=>{
    console.log("its adding user ");

    var uid=request.body.uid;
    var pwd=request.body.pwd;

    strData=`Given data is :UID ${uid} and password:${pwd}`
     console.log(strData);

     var strResult="You are not a valid user, please check the credentials";

     if(uid=="Ganesh" && pwd=="Gani@1998")
     {
         strResult="You are a valid user , welcome "+uid;
         console.log(strResult);
     }
     responce.send(strResult)
  
})
app.listen(port,()=>{
    console.log("listening from server http://localhost:"+port);
})