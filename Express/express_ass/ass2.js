const express=require('express')
const jsonData=require('./data.json')
const app=express();
const port=8000;

app.get('/getAllEmployees',(req,res)=>{
     res.send(jsonData.empolyess)
})

app.listen(port,()=>{
    console.log("server running at http://localhost:"+port);
})