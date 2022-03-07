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

let cartSchema=Sequelize.define('cart',{
    username:sequelize.STRING,
    orderId:{type:sequelize.STRING,
        primaryKey:true},
    recipeId:sequelize.INTEGER,
    recipeQty:sequelize.INTEGER,
    recipePrice:sequelize.STRING
},{
    timestamps:true,
    freeTableName:true 
}
)
cartSchema.sync().then((data)=>{
    console.log("cart table created please check in db");
}).catch((err)=>{
    console.log("Got error in while creating table :"+err);
})

module.exports=cartSchema;