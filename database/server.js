const Sequelize=require('sequelize');
const dbConfig=require('./db.config')
const express=require('express');
//rotutes import
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const productRoute=require('./routes/product')
const cartRoute=require('./routes/cart')
const ordersRoute=require('./routes/order')
const userDetails=require('./routes/userDetails')

const cors=require('cors');
const app=express();
const port=8080;

app.use(cors());
// let sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
//     host:dbConfig.HOST,
//     dialect:dbConfig.dialect,
//     port:8000,
//     pool:{
//         max:dbConfig.pool.max,
//         min:dbConfig.pool.min,
//         acquire:dbConfig.pool.acquire,
//         idle:dbConfig.pool.idle
//     }
// })
// sequelize.authenticate().then(()=>{
//     console.log("successfully connected to db...");
// }).catch((error)=>{
//     console.log("Getting some-error while connecting please check it",error);
// })
app.use(express.json());
app.use('/api/auth',authRoute);
app.use("/api",userRoute)
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",ordersRoute)
app.use("/api/userDetails",userDetails)



app.listen(port,()=>{
    console.log("server is running on http://localhost:"+port);
})

// module.exports=sequelize;

