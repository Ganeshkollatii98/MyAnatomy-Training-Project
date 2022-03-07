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

let orderSchema=Sequelize.define('orders',{
    username:sequelize.STRING,
    orderId:sequelize.STRING,
    address:sequelize.STRING,
    recipes:sequelize.JSON,
    status:{
        type:sequelize.INTEGER,
        defaultValue:0
    }
},{
    timestamps:true,
    freeTableName:true 
}
)

orderSchema.sync().then((data)=>{
    console.log("orders table created please check in db");
}).catch((err)=>{
    console.log("Got error in while creating table :"+err);
})

module.exports=orderSchema;