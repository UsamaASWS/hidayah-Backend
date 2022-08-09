const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling Get Req to /Books'
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling Post Req to /Books'
    });
});

router.get('/:UserId',(req,res,next)=>{
    const id = req.params.bookid;
    if(id === 'special'){
        res.status(200).json({
            message:'Decover Special ID'
        });
    }else{
        res.status(200).json({
            message:'Ordinary Books',
            UserId:req.params.UserId
        });
    }
   
});

router.patch('/:UserId',(req,res,next)=>{
    res.status(200).json({
        message:'updated book records',
        UserId:req.params.UserId
    })
});

router.delete('/:UserId',(req,res,next)=>{
    res.status(200).json({
        message:'delted book records',
        UserId:req.params.UserId

    })
});
module.exports =router;