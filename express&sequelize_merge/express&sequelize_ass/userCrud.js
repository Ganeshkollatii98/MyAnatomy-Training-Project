const express=require('express')
const Sequelize=require('sequelize')
const dbConfig=require('./db.config')
const port1=8080;
const app=express();

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    port:8000,
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

let usersTable=sequelize.define('users',{
    userId:Sequelize.STRING,
    password:Sequelize.STRING,
    role:Sequelize.STRING
},{timestamps:false,freezeTableName:true});

usersTable.sync().then((data)=>{
    console.log("Table created successfully");
}).catch((err)=>{
    console.log("Unable to create table please check :",err);
})
app.get("/",(req,res)=>{
    usersTable.findAll({raw:true}).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log("err")
    })
})
app.use(express.json())

app.get("/login",(req,res)=>{
    
    let uid=req.body.userId;
    let pass=req.body.password;
    console.log(uid,pass);
    usersTable.findAll({raw:true}).then((data)=>{
        
        let isLogged=data.filter((user)=>user.userId==uid && user.password==pass)
        if(isLogged.length>=1){
            res.status(200).send("User successfully loggedIn")
        }
        else{
            res.status(200).send("please check your credentials")
        }
    }).catch((err)=>{
        res.status(400).send("server error please check"+err)
    })
})

app.use(express.json())
app.post("/register",(req,res)=>{
    let userObj=req.body;
    let newRecord=usersTable.build(userObj);
    newRecord.save().then((data)=>{
        res.status(200).send("Registered successfully please login..")
    }).catch((err)=>{
        res.status(400).send("unable to register plese check"+err)
    })
    
})


app.listen(port1,()=>{
    console.log("Server running on http://localhost:"+port1);
})