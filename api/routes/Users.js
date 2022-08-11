const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const User = require('../models/user')

router.get('/',(req,res,next)=>{
    User.find()
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
});

router.post('/',(req,res,next)=>{
    const user=new User({
        User_id:new mongoose.Types.ObjectId(),
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        husband_fatherName:req.body.husband_fatherName,
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
        Phone:req.body.Phone,
        avatar:req.body.avatar,
        isAdmin:req.body.isAdmin,
        isAccountant:req.body.isAccountant,
        shift:req.body.shift,
        perHourRate:req.body.perHourRate
    });
    user.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err));

    res.status(201).json({
        message:'Handling Post Req to /Books',
        createdBook:user
        
    });
    console.log(user);
});

router.get('/:userid',(req,res,next)=>{
    const id = req.params.userid;
    User.findById(id)
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

router.patch('/:userid',(req,res,next)=>{
   const id=req.params.userid;
   const updateOps={};
   for(const ops of req.body){
       updateOps[ops.propName] = ops.value;
   }
    Book.updateMany({_id:id},{$set:updateOps})
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

router.delete('/:userid',(req,res,next)=>{
   const id= req.params.bookId;
    Book.remove({
        Book_id:id
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