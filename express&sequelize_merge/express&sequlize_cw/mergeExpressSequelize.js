const express=require('express')
const Sequelize=require('sequelize')
const dbConfig=require('./db.config')
const app=express();
const port=8080;

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idel
    }
})

let employeeTable=sequelize.define('EmployeeSequelize',{
    empId:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:Sequelize.STRING,
    dept:Sequelize.STRING,
    designation:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
})

employeeTable.sync().then((data)=>{
    console.log("created table please check in db");
}).catch((err)=>{
    console.log("Got error in while creating table :"+err);
})

var fetchingRecordsFromDB=()=>{
    
}

app.get('/',(req,res)=>{
    res.send("server working")
})
app.get('/getEmployees',(req,res)=>{
    employeeTable.findAll({raw:true}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err);
    })
})
// *********Fetching data ***********

app.get('/getEmployee/:id',(req,res)=>{
    let id=req.params.id;
    employeeTable.findByPk(id).then((data)=>{
        res.status(202).send(data)
    }).catch((err)=>{
        res.status(404).send(error)
    })
})

// *********Insertion ***********
app.use(express.json())
app.post('/insertEmployee',(req,res)=>{
     let empObj=employeeTable.build(req.body);
    //  res.send(empObj)
     empObj.save().then((data)=>{
         let strResult="Records inserted successfully";
         console.log(strResult);
         res.status(201).send(strResult);
     }).catch((err)=>{
         console.log("We are unable to send data into db",err);
         res.status(400).send(err)
     })
})

// *********updation ***********
app.put('/updateEmployee',(req,res)=>{
    let name_param=req.body.name;
    let id_param=req.body.empId;
    let dept_param=req.body.dept;
    let desig_param=req.body.designation;

    employeeTable.update(
        {name:name_param,designation:desig_param},
        {where:{empId:id_param},raw:true}
    ).then((data)=>{
        let strResult="Record Updated Successfully";
        console.log(strResult);
        res.status(201).send(strResult);
    }).catch((err)=>{
        let strResult="Unable to update record please check it :"+err;
        console.log(strResult);
        res.status(400).send(strResult);
    })
})

// *****deletion******
app.delete("/deleteEmployee",(req,res)=>{
    let id=req.body.empId;
    employeeTable.destroy({where:{empId:id},raw:true}).then((data)=>{
        let strResult="Record deleted successfully"+data;
        console.log(strResult);
        res.status(200).send(strResult);
    }).catch((err)=>{
        let strResult="unable to delete data due to this error :"+err;
        console.log(strResult);
        res.status(400).send(strResult);
    })
})

app.listen(port,()=>{
    console.log("Server running on http://localhost:"+port);
})