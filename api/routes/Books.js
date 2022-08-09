const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const Book = require('../models/books')

router.get('/',(req,res,next)=>{
    Book.find()
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
    const book=new Book({
        Book_id:new mongoose.Types.ObjectId(),
        Book_Title:req.body.Book_Title,
        Class:req.body.Class,
        Publisher:req.body.Publisher,
        ReleaseDate:req.body.ReleaseDate,
        Desc:req.body.Desc,
    });
    book.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err));

    res.status(201).json({
        message:'Handling Post Req to /Books',
        createdBook:book
        
    });
    console.log(book);
});

router.get('/:bookid',(req,res,next)=>{
    const id = req.params.bookid;
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

router.patch('/:bookid',(req,res,next)=>{
   const id=req.params.bookid;
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

router.delete('/:bookid',(req,res,next)=>{
   const id= req.param.bookId;
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