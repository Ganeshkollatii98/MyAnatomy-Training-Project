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
let userDetailsSchema=sequelize.define('userDetails',{
   email:Sequelize.STRING,
   address:Sequelize.STRING,
   phonenumber:Sequelize.STRING,
   pincode:Sequelize.INTEGER
},{
   timestamps:true,
   freeTableName:true 
}
)
userDetailsSchema.sync().then((data)=>{
   console.log("userDetails table created please check in db");
}).catch((err)=>{
   console.log("Got error in while creating table :"+err);
})

module.exports=userDetailsSchema;