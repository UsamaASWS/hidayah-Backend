const mongoose = require('mongoose');
const SalariesSchema = mongoose.Schema({

    Salary_Id: mongoose.Types.ObjectId,

    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:""
    },

    Date: Date, required: "",

    Total_Salary: Number, required: "",
    jobGroup: Number,required:""
});
SalariesSchema.index({jobGroup:1})
module.exports = mongoose.model('salaries', SalariesSchema);