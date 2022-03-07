const express=require("express")
const app=express();
const port=7000;
app.get("/getAllEmployess",(request,responce)=>{
    responce.send("Fetching all employees using get()")
    console.log("Fetching all employees using get()");
})


app.post("/insertEmployee/:id",(request,responce)=>{
    responce.send("inserting employee using post()"+request.params.id)
    console.log("inserting employee using post()"+request.params.id);
})

app.put("/updateEmployee/:id",(request,responce)=>{
    responce.send("updating employee using put()"+request.params.id)
    console.log("updating employee using put()"+request.params.id);
})

app.delete("/deleteEmployee/:id",(request,responce)=>{
    responce.send("delete employee using delete()"+request.params.id)
    console.log("delete employee using delete()"+request.params.id);
})

app.listen(port,()=>{
    console.log("server is running on http://localhost:"+port);
})