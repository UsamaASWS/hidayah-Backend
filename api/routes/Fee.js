const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Fee = require('../models/Fee');


router.get('/',(req,res,next)=>{
       
    Fee.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        if(docs.length>=0){
            res.status(200).json(docs);
        }else{
            res.status(404).json({
                message:'No Entries Found'
            });
        }
    })
    .catch(error=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=>{
    
    console.log(req.file);
    //Create Constructor
    const fee=new Fee({
        Fee_id:new mongoose.Types.ObjectId(),
        User_id:req.body.User_id,
        Totle_Salary:req.body.Totle_Salary,
        Date:req.body.Date,
       
    });
    fee.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err));

});

router.get('/:Fee_Id',(req,res,next)=>{
    const id = req.params.Fee_Id;
    Book.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message:"No valiid entry found for provided Book_Id"
            });
        }
       
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
   
});

router.patch('/:Fee_Id',(req,res,next)=>{
   const id=req.params.Fee_Id;
   const updateOps={};
   for(const ops of req.body){
       updateOps[ops.propName] = ops.value;
   }
    Fee.updateMany({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.delete('/:Fee_Id',(req,res,next)=>{
   const id= req.params.Fee_Id;
    Fee.remove({
        Fee_id:id
    })
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});
module.exports =router;