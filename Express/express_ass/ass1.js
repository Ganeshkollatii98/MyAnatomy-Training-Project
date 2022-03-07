const express=require("express");
const app=express();
const port=8000;

app.use(express.json())

app.post("/login",(req,res)=>{
    
    var uid=req.body.uid;
    var pwd=req.body.pwd;

    if(uid=="Ganesh" && pwd=="Admin")
    {
        res.send("user successfully logged in")
    }
    else{
        res.send("please check user credentails")
    }
})


app.listen(port,()=>{
    console.log("Server running at http://localhost:"+port);
})