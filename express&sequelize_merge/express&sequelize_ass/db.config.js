module.exports={
    HOST:"localhost",
    USER:"postgres",
    PASSWORD:"Gani@1998",
    // schema name
    DB:"test",
    dialect:"postgres",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}