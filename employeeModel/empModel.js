const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name : String,
    age : Number,
    role : String,
    email : String,
    salary : Number,
    userId : mongoose.Types.ObjectId,
    paid : Boolean
})

const employeeModel = mongoose.model('emp',employeeSchema);

module.exports = employeeModel;