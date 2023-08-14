const mongoose = require("mongoose")
require("dotenv").config()


const userSchema = mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, unique:true,require:true},
    password: {type:String,require:true}
})

const UserModel = mongoose.model("user", userSchema);


module.exports = {UserModel}