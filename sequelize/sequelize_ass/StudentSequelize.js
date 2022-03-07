const Sequelize=require('sequelize');
const dbconfig=require('./db.config')

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
sequelize.authenticate().then(() => {
    console.log("successfully connected with the database...");
}).catch((err) => {
    console.log("unable to connect with the database,reason :" + err);
})

let studentTable=sequelize.define('students',{
    student_id:Sequelize.STRING,
    studentName:Sequelize.STRING,
    studentStream:Sequelize.STRING,
    studentMarks:Sequelize.STRING
})

studentTable.sync().then((data)=>{
     console.log("Student Table created successfully");
     console.log(data);
}).catch((err)=>{
    console.log("unable to create table please check this error",+err);
})

studentTable.create({studen_id:101,studentName:"Ganesh",studentStream:"cse",studentMarks:7.5}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log("unable to insert data"+err);
})
// studentObj.save();