const sequelize=require('sequelize');
const dbConfig=require('../db.config')
let Sequelize=new sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
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

let productSchema=Sequelize.define('products',{
     desc:sequelize.STRING,
     img:sequelize.STRING,
     name:sequelize.STRING,
     price:sequelize.INTEGER,
     rating:sequelize.INTEGER,
     qty:sequelize.INTEGER,
     type:sequelize.STRING
         
},{
    timestamps:true,
    freeTableName:true 
}
)

productSchema.sync().then((data)=>{
    console.log("product table created please check in db");
}).catch((err)=>{
    console.log("Got error in while creating table :"+err);
})
module.exports=productSchema;