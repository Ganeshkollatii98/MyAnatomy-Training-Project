const router=require('express').Router();
const productSchema = require('../models/Product');
const product=require('../models/Product')
const db=require('../db.json')
// inserting new product
router.post("/addProduct",(req,res)=>{
    // let productObj=req.body;
    // console.log(productObj,);
    let obj=db.menulist;
    let newProduct=product.build(productObj);
    newProduct.save().then((data)=>{
        res.status(200).send("new product inserted in db");
    }).catch((error)=>{
        res.status(401).send("unable to insert new product");
    })
    // product.bulkCreate(obj).then((data)=>{
    //     res.status(200).send("new product inserted in db");
    // }).catch((error)=>{
    //     res.status(401).send("unable to insert new product");
    // }) ;

})


router.get("/",(req,res)=>{
    
    if(req.query.rating){
        let ratingQuery =req.query.rating;
        productSchema.findAll({where:{rating:ratingQuery}},{raw:true}).then((data)=>{
            res.status(201).send(data);
        }).catch((error)=>{
            res.status(400).send("unable to get all ro")
        })
    }
    else if(req.query.type){
        let typeQuery=req.query.type;
        console.log(typeof typeQuery);
        if(typeQuery=="non-veg")
        {
            productSchema.findAll({where:{type:typeQuery}},{raw:true}).then((data)=>{
                res.status(201).send(data);
            }).catch((error)=>{
                res.status(400).send("unable to get data")
            })
        }
        else if(typeQuery=="veg")
        {
            productSchema.findAll({where:{type:typeQuery}},{raw:true}).then((data)=>{
                res.status(201).send(data);
            }).catch((error)=>{
                res.status(400).send("unable to get data")
            })
        }
    }   
    else{
        productSchema.findAll({raw:true}).then((data)=>{
            res.status(201).send(data);
        }).catch((error)=>{
            res.status(400).send("unable to get all ro")
        })
    }
})

// get all products
router.get("/:id",(req,res)=>{
    let id=req.params.id
    console.log(req.params.id);
    
        productSchema.findByPk(id,{raw:true}).then((data)=>{
            res.status(201).send(data);
        }).catch((error)=>{
            res.status(400).send("unable to get all ro")
        })
})
//delete
router.delete("/deleteProduct/:id",(req,res)=>{
    console.log(req.body.id);
    let id=req.body.id;
     productSchema.destroy({where:{id:id}}).then((data)=>{
         console.log(data);
         res.status(200).send("deleted product"+data);

     }).catch((error)=>{
         console.log(error);
         res.status(401).send("unable to delete product")
     })
})


module.exports=router;