const Sequelize=require('sequelize')
const dbConfig=require('./db.config')

const sequelize=new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
       max:dbConfig.pool.max,
       min:dbConfig.pool.min,
       acquire:dbConfig.pool.acquire,
       idle:dbConfig.pool.idle
    }
})
sequelize.authenticate().then(() => {
    console.log("successfully connected with the database...");
}).catch((err) => {
    console.log("unable to connect with the database,reason :" + err);
})
let movieTable=sequelize.define("movies",{
    movieId:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    movieName:Sequelize.STRING,
    type:Sequelize.STRING,
    language:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
})
movieTable.sync().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log("unable to create table"+err);
})
// movieTable.bulkCreate([{movieId:101,movieName:'Pushpa',type:'Action',language:'telugu'},{movieId:102,movieName:'Khiladi',type:'Action',language:'telugu'},
// {movieId:103,movieName:'Shym',type:'love',language:'telugu'},{movieId:104,movieName:'love story',type:'love',language:'telugu'}]);
// movieObj.save();

//fetching
movieTable.findAll({raw:true}).then((data)=>{
   console.log(data);
}).catch((err)=>{
    console.log("getting some error while fetching data from db "+err);
})

// with primary key

movieTable.findByPk(101).then((data)=>{
    console.log("****Fetching record using Primary key****");
    console.log(data);
}).catch((err)=>{
    console.log("Got Some Error while fetching Data with primary key :"+err);
})