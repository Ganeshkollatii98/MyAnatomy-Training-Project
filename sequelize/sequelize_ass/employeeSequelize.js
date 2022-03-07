const Sequelize=require('sequelize');
const dbConfig=require('./db.config')

let sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle  
    }
})

sequelize.authenticate().then(()=>{
    console.log("---- successfully connected to the database ----");
}).catch((err)=>{
    console.log("---- Database not connected ----");
})


let employeeTable=sequelize.define('employees',{
    empId:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    empName:Sequelize.STRING,
    empDept:Sequelize.STRING,
    empDesignation:Sequelize.STRING,
    percentage:Sequelize.INTEGER

},{
    timestamps:false,
    freezeTableName:true
})

employeeTable.sync().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log("Table Not Created Due Some Error :"+err);
})
// we can push mupltiple records in single time
// employeeTable.bulkCreate([
//     {empId:101,empName:"Ravi",empDept:"CSE",empDesignation:"SDE",percentage:80},
//     {empId:102,empName:"Sham",empDept:"CSE",empDesignation:"Fornt end",percentage:75},
//     {empId:103,empName:"Ramesh",empDept:"ECE",empDesignation:"SE",percentage:65},
//     {empId:104,empName:"Priya",empDept:"Mech",empDesignation:"ME",percentage:90},
//     {empId:105,empName:"Meena",empDept:"EEE",empDesignation:"Manager",percentage:80}
//   ])
  
  employeeTable.findAll({raw:true}).then((data)=>{
    console.log("*****Table Data*****");
    console.log(data);
}).catch((err)=>{
    console.log("Got Some Error While Fetching Table :"+err);
})

employeeTable.findByPk(101).then((data)=>{
    console.log("****Fetching record using Primary key****");
    console.log(data.dataValues);
}).catch((err)=>{
    console.log("Got Some Error while fetching Data with primary key :"+err);
})

// Fetching table using where clause by employee name
employeeTable.findAll({where:{empName:'Ravi'},raw:true}).then((data)=>{
    console.log("****Fetching record using where clause****");
    console.log(data);
}).catch((err)=>{
    console.log("Got error when record fetching with where :"+err);
})

// Fetching only emp name and department

employeeTable.findAll({attributes:['empName','empDept'],raw:true}).then((data)=>{
    console.log("****Fetching record emp name and dept****");
    console.log(data);
}).catch((err)=>{
    console.log("Got Some error While fetching records :"+err);
})

// Fetching only emp with dept cse
 employeeTable.findAll({where:{empDept:'CSE'},raw:true}).then((data)=>{
    console.log("****Fetching record emp where empDept==cse****");
     console.log(data);
 }).catch((err)=>{
     console.log("Got Some error While fetching records :"+err);
 })

 // Count number of records in table
 employeeTable.findAndCountAll({row:true}).then((data)=>{
    console.log("****Total number of records in table***");
     console.log("Number of Rrcords in table:",data.count);
 }).catch((err)=>{
     console.log("Got some error while fethcing records :"+err);
 })

 // display all records in sorted order by name

 employeeTable.findAll({order:['empName'],raw:true}).then((data)=>{
    console.log("****sorting records by name in table***");
     console.log("Number of Rrcords in table:",data);
 }).catch((err)=>{
     console.log("Got some error while fethcing records :"+err);
 })

 // using like operator

 const op=Sequelize.Op;
 employeeTable.findAll(
     {where:{
         empName:{
             // it fecths name starting with R
             [op.like]:'R%'
         }
     },raw:true}
 ).then((data)=>{
    console.log("****fetching records using like operator on name in table***");
     console.log(data);
 }).catch((error)=>{
    console.log("Got some error while fethcing records :"+err);
 })
//  where using and  clause

employeeTable.findAll(
    {
        where:{
            [op.and]:[{empDept:'CSE'},{percentage:{
                [op.gte]:75}}]
        },raw:true
    }).then((data)=>{
    console.log("****fetching records using where and greater then 75 operator on name in table***");
        console.log(data);
    }).catch((err)=>{
        console.log("Got some error while fethcing records :"+err);

    })
//  Inserting new record

// let employeObj=employeeTable.build({empId:106,empName:"Ganesh",empDept:"CSE",empDesignation:"React Dev",
// percentage:70})
// employeObj.save();

// updating
employeeTable.update(
    {empName:'Ganesh Kollati'},
    {where:{
        empName:'Ganesh'
    },raw:true
}).then((data)=>{
    console.log("****updaiting record empName with suranme table***");
        console.log(data);
    }).catch((err)=>{
        console.log("Got some error while fethcing records :"+err);
    })



