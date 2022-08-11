const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        User_id : mongoose.Types.ObjectId,

        firstname: String,required:"",
        
        lastname:String,required:"",

        husband_fatherName:String,required:"",
        
        fullname:String,required:"",

        email: String, required:"",
        
        password:  String, required: "",
        
        Phone: Number, required:"",

        avatar: String,required:"",
     
        Role :  String, required:"",

        isAdmin: String,required:"",

        isAccountant: String,required:"", 

        isNazim: String,required:"",

        shift:String,required:"",
        
        class: String,required:"",
        
        perHourRate:  Number, required:"",
        
       
    }
)




module.exports = mongoose.model('User', userSchema)
