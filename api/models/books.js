const mongoose = require('mongoose');

const bookSchema=mongoose.Schema({
    Book_id: mongoose.Schema.Types.ObjectId,
    Book_Title:String, require:"",
    Class: Number, require:false,
    Desc:String,require:"",
    Publisher:String,require:"",
    ReleaseDate:Date, require:false
    
})

module.exports=mongoose.model('Book',bookSchema);