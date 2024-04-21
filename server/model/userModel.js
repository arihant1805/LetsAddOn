const mongoose=require("mongoose");
const { type } = require("os");

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type: String,
        required:true,
        min: 8,
    },
    isPColorSet: {
        type:Boolean,
        default:false,
    },
    PColor:{
        type:String,
        default:"gold"
    },
});

module.exports = mongoose.model("Users",userschema);