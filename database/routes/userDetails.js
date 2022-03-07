const router=require('express').Router();
const userDetailsSchema = require('../models/userDetails');

router.get("/:email",(req,res)=>{
    console.log(req.params.email);
    userDetailsSchema.findAll({where:{email:req.params.email}},{raw:true}).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(400).send("unable to fetch users records..",error)
    })
})
router.post("/",(req,res)=>{
    let usernameParam=req.body.username;
    let addressParam=req.body.address;
    let phonenumberParam=req.body.phonenumber;
    let pincode=req.body.pincode;
   let userDetails= userDetailsSchema.build({
        email:usernameParam,
        address:addressParam,
        phonenumber:phonenumberParam,
        pincode:pincode
    })

    userDetails.save().then((data)=>{
        // "order created"
        res.status(201).send(data);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);

    })

})

router.put("/",(req,res)=>{
    let e=req.body.username;
    let address=req.body.address;
    let pn=req.body.phonenumber;
    let p=req.body.pincode;
    console.log(e,address,pn,p);
        userDetailsSchema.update({
            address:address,
            phonenumber:pn,
            pincode:p
        },{where:{email:e}}).then((data)=>{
            console.log("updated "+data);
            res.status(200).send("updated please check db")
        }).catch((error)=>{
            res.status(401).send(error)

        })
    
})

module.exports=router;
