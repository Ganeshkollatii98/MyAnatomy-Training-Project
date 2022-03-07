const Sequelize=require('sequelize');
const dbConfig=require('../db.config')

let sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
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
let userSchema=sequelize.define('users',{
     username:{
         type:Sequelize.STRING,
        //  unique:true
        },
    email:{
        type:Sequelize.STRING
    },
    password:Sequelize.STRING,
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:true,
    freeTableName:true 
}
)
userSchema.sync().then((data)=>{
    console.log("user table created please check in db");
}).catch((err)=>{
    console.log("Got error in while creating table :"+err);
})

module.exports=userSchema;