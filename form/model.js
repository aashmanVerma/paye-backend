const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    title : String,
    requirements : String,
    description : String,
    userId : mongoose.Types.ObjectId
})

const formModel = mongoose.model('form',formSchema);

module.exports = formModel;