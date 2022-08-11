
const mongoose = require('mongoose');
const SalariesSchema = mongoose.Schema(
    {
        Fee_Id:mongoose.Types.ObjectId,
        
        User_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        Date: Date, required:"",

        Totle_Fee: {
            type: Number,
            required:"",
        },
    }
)

module.exports = mongoose.model('Salaries', SalariesSchema)