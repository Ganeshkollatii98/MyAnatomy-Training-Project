const router=require('express').Router();
const orderSchema=require("../models/Orders");
const { route } = require('./cart');
var nodemailer = require("nodemailer");

const Sequelize=require('sequelize');

var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kollatiganesh1998@gmail.com',
                pass: '9912053395'
            }
        });

router.get("/",(req,res)=>{
    orderSchema.findAll({raw:true}).then((data)=>{
        console.log(data);
        res.status(201).send(data);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})
router.get("/:email",(req,res)=>{
    console.log(req.params.email);
    orderSchema.findAll({where:{username:req.params.email}},{raw:true}).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(400).send("unable to fetch order records..",error)
    })
})

router.post("/",(req,res)=>{
    let usernameParam=req.body.username;
    let addressParam=req.body.address;
    let recipeArray=req.body.recipes
    let statusParam=req.body.status;
    let orderIdDummy =""+(new Date()).getTime();
   let OrderPlaced= orderSchema.build({
        username:usernameParam,
        orderId:orderIdDummy,
        address:addressParam,
        recipes:recipeArray,
        status:statusParam
    })
    
    OrderPlaced.save().then((data)=>{
        // "order created"
        res.status(201).send(data);
        // mailler
        var mailOptions = {
            from:'kollatiganesh1998@gmail.com',
            to: `${usernameParam}`,
            subject: 'Thank you for shopping',
            html:'<h2> Thank you for ordering pizza 😍, and Pizza will deliver in 30 mins. <br> Enjoy you pizza😍</h2>'
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.error(err);
            else
                console.log('Email sent :' + info.response);
        })
       

    }).catch((error)=>{
        console.log(error);
        res.status(400).send("order not created");

    })

})
let op=Sequelize.op;
router.put("/",(req,res)=>{
    let updateStaus=req.body.status;
    let usernameBody=req.body.username;
    let orderIdBody=req.body.orderId
    console.log(orderIdBody);
    // let orderId =""+(new Date()).getTime();
    if(updateStaus){
        orderSchema.update({status:updateStaus},
            {where:{username:usernameBody,orderId:orderIdBody}}).then((data)=>{
            console.log("updated "+data);
            res.status(200).send("updated please check db")
        }).catch((error)=>{
            res.status(401).send(error)

        })
    }
})
module.exports=router;