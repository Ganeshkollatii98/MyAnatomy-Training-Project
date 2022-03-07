const express=require('express')
const jsonData=require('./data.json')
const app=express();
const port=8000;

app.get('/getAllEmployees',(req,res)=>{
     res.send(jsonData.empolyess)
})
app.get('/getAllEmployees/:id',(req,res)=>{
     var empObjArray=jsonData.empolyess;
     console.log(req.params.id);
     var emp=empObjArray.filter((emp)=>emp.id==req.params.id)
     if(emp.length==0)
     {
         res.send("employee record not available")
     }
     res.send(emp[0])

})
app.get('/getAllEmployees/:name',(req,res)=>{
    var empObjArray=jsonData.empolyess;
    console.log(empObjArray);
    console.log(req.params.name);
    
    var emp=empObjArray.filter((emp)=>
        emp.name==req.params.name)
    console.log(emp.length);
    if(emp.length==0)
    {
        res.send("employee record not available")
    }
    res.send(emp[0])

})
app.use(express.json())
app.post("/getAllEmployees",(req,res)=>{
    //  res.send(req.body)
    var empObj=req.body;
    if(Object.keys(empObj)!=0){
        jsonData.empolyess.push(req.body)
        res.send("Record Inserted Successfully")
    }
    else{
        res.send("unable to insert data")
    }

})
app.put("/updateEmployee/:id",(req,res)=>{
    //  res.send(req.body)
    var empObj=req.body;
    var id=req.params.id;
    console.log(empObj);
    if(Object.keys(empObj)!=0){
        jsonData.empolyess.forEach((emp)=>{
            if(emp.id==id)
            {
                emp.name=empObj.name;
                emp.designation=empObj.designation;
                emp.email=empObj.email;
            }
        })
        res.send("Record Updated Successfully")
    }
    else{
        res.send("unable to update data")
    }

})

app.delete("/deleteEmpRecord/:id",(req,res)=>{
    //   console.log(req.params.id);
    var jsonArr=jsonData.empolyess;
    var id=req.params.id;
    var emp=jsonArr.filter((emp)=>emp.id==id)

    if(emp.length==0)
    {
        res.send("employee record with id not avaialable");
    }
    else{
        jsonData.empolyess.splice(id-1,1);

        res.send("record Deleted succssfully");
        // res.send(jsonData.empolyess)
    }

})

app.listen(port,()=>{
    console.log("server running at http://localhost:"+port);
})