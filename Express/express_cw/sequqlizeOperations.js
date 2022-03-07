
const Sequelize = require('sequelize')

const dbconfig = require('./db.config')

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
})

// authenticate will check connection is fine or not 
sequelize.authenticate().then(() => {
    console.log("successfully connected with the database...");
}).catch((err) => {
    console.log("unable to connect with the database,reason :" + err);
})

//creating table here 'usertable'
// let UserSequelize = sequelize.define('userTable', {
//     usedId: Sequelize.STRING,
//     Password: Sequelize.STRING,
//     Role: Sequelize.STRING
// }, {
//     // here extra columns will not add if we specifie this
//     timestamps: false,
//     freezTableName: true
// });

//force: if table already created means it will delete and create new table
// UserSequelize.sync({ force: true }).then(() => {
//     console.log("Table is created successfully..");
// }).catch((err) => {
//     console.log("Got error While creating table" + err);
// })


// Product Deatils

let ProductSequelize = sequelize.define('ProductSequelize', {
    productId: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    productName: Sequelize.STRING,
    Description: Sequelize.STRING,
    cost: Sequelize.INTEGER
},{
    timestamps: false,
    freezTableName: true,
})

// recreate the table if table exit
ProductSequelize.sync().then(() => {
    console.log();
    console.log("Table is productSequelize defined successfully");
    console.log();
}).catch((err) => {-
    console.log("error while creating a table ,reason" + err);
})
console.log("\n--------findAllByPk-----------");
ProductSequelize.findByPk(103).then((data) => {
    console.log("\n\n\n\nfetched");
    console.log(data.dataValues);
}).catch((err) => {
    console.log("Unable to fetch from the table product sequelize" + err);
})
console.log("\n--------findAll Where-----------");
ProductSequelize.findAll({where:{productName:"oneplus mobile"},raw:true}).then((data) => {
    console.log("\n\n\n\n Where condation fetched");
    console.log(data);
}).catch((err) => {
    console.log("Unable to fetch from the table product sequelize" + err);
})

// Select query using few attributes
ProductSequelize.findAll({attributes:['Description','cost'],where:{productName:"oneplus mobile"},raw:true}).then((data) => {
    console.log("\n\n\n\n Where  and select condation fetched");
    console.log(data);
}).catch((err) => {
    console.log("Unable to fetch from the table product sequelize" + err);
})

// orderby
ProductSequelize.findAll({order:['productName'],raw:true}).then((data) => {
    console.log("\n\n\n\n orderBy condation fetched");
    console.log(data);
}).catch((err) => {
    console.log("Unable to fetch from the table product sequelize" + err);
})


sequelize.query("SELECT * FROM `ProductSequelizes` where productName='oneplus tv'",{type:Sequelize.QueryTypes.SELECT}).then((data)=>{
    console.log("\n\n\n native condation");
    console.log(data);
}).catch((err)=>{
    console.log("unable to execute native sql query :"+err);
})


///sequelize where

const op=Sequelize.Op;

ProductSequelize.findAll({where:{
    [op.or]:[{productName:"oneplus tv"},{productName:"oneplus mobile"}]
},raw:true}).then((data)=>{
    console.log("\n\n\n sequelize or condation");
    console.log(data);
}).catch((err)=>{
    console.log("unable to fetch data.." +err);
})


//inserting new record in table

// ProductSequelize.create({
//     productId:106,
//     productName:'Hp',
//     Description:'16gb ram ',
//     cost:12000
// }).then((data)=>{
//     console.log("\n\n\n\n Inserted new data");
//     console.log(data);
//     console.log("Record inserted successfully");
// }).catch((err)=>{
//     console.log("Unable to insert new data :"+err);
// })

// ProductSequelize.update(
//     {productName:"oneplus mobile"},
//     {where:{productId:"103"}}
// ).then((data)=>{
//     console.log("Updated "+data+" Number of records");
// }).catch((err)=>{
//     console.log("Unable to update record .reason:"+err);
// })

 //Destroy
ProductSequelize.destroy({
    where:{productId:104}
}).then((data)=>{
    console.log(data+" record removed from product details");
}).catch((err)=>{
    console.log("Unable to remove record bcoz :" +err);
})

