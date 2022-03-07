const router=require('express').Router();
const User = require('../models/user');

router.get("/users",(req,res)=>{
    User.findAll({raw:true}).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(400).send("unable to fetch users records..",error)
    })
})
module.exports=router;