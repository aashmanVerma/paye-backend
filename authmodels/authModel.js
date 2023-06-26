const mongoose = require('mongoose');
const validatorjs = require('validator');

const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    }
})

const authModel = mongoose.model('user', userSchema);

module.exports = authModel;