const router=require('express').Router();
const cartSchema=require('../models/Cart')


router.get("/",(req,res)=>{
      cartSchema.findAll({raw:true}).then((data)=>{
          console.log(data);
          res.status(201).send(data);
      }).catch((error)=>{
          res.status(400).send(error);
      })
})
router.get("/:username",(req,res)=>{
    console.log("got request");
    let uname=req.params.username;
    console.log(uname);
    cartSchema.findAll({where:{username:uname}},{raw:true}).then((data)=>{
        // ""
        res.status(201).send(data);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send("order not created");

    })

})
router.post("/",(req,res)=>{
    let uniqueId =""+(new Date()).getTime();
    let usernameParam=req.body.username;
    let recipeIdParam=req.body.recipeId;
    let recipeQtyParam=req.body.recipeQty;
    let recipePriceParam=req.body.recipePrice;
    let addedRecipeToCart=cartSchema.build({
        username:usernameParam,
        orderId:uniqueId,
        recipeId:recipeIdParam,
        recipeQty:recipeQtyParam,
        recipePrice:recipePriceParam
    })
    addedRecipeToCart.save().then((data)=>{
        res.status(201).send("product added to cart created");
    }).catch((error)=>{
        console.log(error);
        res.status(400).send("order not created");
    })
})

router.delete("/",(req,res)=>{
    let usernameBody=req.body.username;
    let recipeIdParam=req.body.recipeId;
    cartSchema.destroy({where:{username:usernameBody,recipeId:recipeIdParam}}).then((data)=>{
        res.status(201).send(data+" Records successfully deleted")
    }).catch((error)=>{
        res.status(401).send(error);
    })
})
router.delete("/:username",(req,res)=>{

    let usernameBody=req.params.username;
    console.log("calling daaa");
    console.log(usernameBody);
    cartSchema.destroy({where:{username:usernameBody}}).then((data)=>{
        res.status(201).send(data+" Records successfully deleted")
    }).catch((error)=>{
        res.status(401).send(error);
    })
})

router.put("/",(req,res)=>{
    let rid=req.body.recipeId;
    let rqty=req.body.recipeQty;
    let uid=req.body.username;
    console.log("check it",rqty);
    cartSchema.update(
        {recipeQty:rqty},
        {where:{username:uid,recipeId:rid}}
        ).then((data)=>{
            res.status(201).send(data)
        }).catch((error)=>{
            res.status(400).send(error);
        })
})

module.exports=router;