const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Salaries = require('../models/salaries');

router.get('/',(req,res,next)=>{
       
    Salaries.find()
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
    
   
    //Create Constructor
    const salaries=new Salaries({
        Salary_id:new mongoose.Types.ObjectId(),
        User_id:req.body.User_id,
        Total_Salary:req.body.Total_Salary,
        Date:req.body.Date,
        jobGroup:req.body.jobGroup,
    });
    salaries.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err));

});

router.get('/:Salary_Id',(req,res,next)=>{
    const id = req.params.Salary_Id;
    Salaries.findById(id)
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

router.patch('/:Salary_Id',(req,res,next)=>{
   const id=req.params.Salary_Id;
   const updateOps={};
   for(const ops of req.body){
       updateOps[ops.propName] = ops.value;
   }
    Salaries.updateMany({_id:id},{$set:updateOps})
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

router.delete('/:Salary_Id',(req,res,next)=>{
   const id= req.params.Salary_Id;
    Salaries.deleteOne({
        _Id:req.params.Salary_Id
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