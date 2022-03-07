const express=require('express')
const jsonData=require('./data.json')
const app=express();
const port=8000;

app.use(express.json())
app.post('/calculateSalary',(req,res)=>{
        // variables for calculating salary
        var basic=req.body.basic;
        var hra=req.body.hra;
        var da=req.body.da;
        var it=req.body.it;
        var pf=req.body.pf;
        
        // calculate salary
       var salary=totalSalary(basic,hra,da,pf,it);
       console.log(salary);
       res.send("The Salary is -> "+salary)
        
        

})
var totalSalary=(basic,hra,da,pf,it)=>{
    return (basic + hra + da - (it + pf));
}
app.listen(port,()=>{
    console.log("server running at http://localhost:"+port);
})