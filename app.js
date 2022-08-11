const express= require('express');
const app = express();
//Log node req
const morgan= require('morgan')
//Parse URls
const bodyParser= require('body-parser')
const mongoose= require('mongoose');

const booksRoutes = require('./api/routes/Books')
const userRoutes= require('./api/routes/Users')
const salariesRoutes= require('./api/routes/Salaries')
const feeRouters= require('./api/routes/Fee')

mongoose.connect('mongodb+srv://usama:0000@hidayahapp.yvqpl.mongodb.net/?retryWrites=true&w=majority');
//midelware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//core
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization"
        );
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Method','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
})
//Routes which should handle request
app.use('/books',booksRoutes);
app.use('/users',userRoutes);
app.use('/salaries',salariesRoutes);
app.use('/fee',feeRouters);
app.use((req,res,next)=>{
    const error =new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports =app;