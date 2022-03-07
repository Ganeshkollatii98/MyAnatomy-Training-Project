const express=require('express')
const Sequelize=require('sequelize')
const dbConfig=require('./db.config')
const port=8080;
const app=express();

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
})


sequelize.authenticate().then((data)=>{
    console.log("successfully connected to the database");
}).catch((err)=>{
    console.log("unable to create table due to this :"+err);
})

let insuranceTable=sequelize.define('Insurance',{
    PolicyNumber:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    PolicyName:Sequelize.STRING,
    PolicyAmount:Sequelize.INTEGER,
    MaturityAmount:Sequelize.INTEGER,
    Nominee:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true,
})

insuranceTable.sync().then((data)=>{
    console.log("Successfully created table");
}).catch((err)=>{
    console.log("Unable to create table :"+err);
})
// get pollicies
app.get('/getAllPolicies',(req,res)=>{
    insuranceTable.findAll({raw:true}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        let strResult="Unable to fetch records"+err;
        res.status(400).send(strResult);
    })

})
app.get('/getAllPolicie/:id',(req,res)=>{
    let id=req.params.id
    console.log(id);
    insuranceTable.findByPk(id).then((data)=>{
        console.log(data);
        res.status(200).send(data)
    }).catch((err)=>{
        let strResult="Unable to fetch record"+err;
        res.status(400).send(strResult);
    })

})

//insert new police
app.use(express.json())
app.post('/newPolicy',(req,res)=>{
    let policyObj=req.body;
    let newRecord=insuranceTable.build(policyObj);
    newRecord.save().then((data)=>{
        let strObj="new policy inserted into database :"+data
        res.status(200).send(strObj)
    }).catch((err)=>{
        let strObj="unable to insert new record due to :"+data
        res.status(400).send(strObj)
    })  
})

app.put("/updatePolicy",(req,res)=>{
    let id_param=req.body.PolicyNumber;
    let name_param=req.body.PolicyName;
    let amnt_param=req.body.MaturityAmount;
    let Nominee_param=req.body.Nominee;
    insuranceTable.update(
        {PolicyName:name_param,PolicyAmount:amnt_param,Nominee:Nominee_param},
        {where:{PolicyNumber:id_param},raw:true}
        
    ).then((data)=>{
        let strResult="Updated recorcd successfully :"+data
        res.status(200).send(strResult);
    }).catch((err)=>{
        let strResult="Unable to update record please check :"+err;
        res.status(400).send(strResult);
    })
})

app.delete('/deletePolicy',(req,res)=>{
    let id=req.body.PolicyNumber;
    insuranceTable.destroy({where:{PolicyNumber:id},raw:true}).then((data)=>{
        let strResult="deleted recorcd successfully :"+data
        res.status(200).send(strResult);
    }).catch((err)=>{
        let strResult="Unable to delete record please check :"+err;
        res.status(400).send(strResult);
    })
})
app.listen(port,()=>{
    console.log("Server running on http://localhost:"+port);
})

