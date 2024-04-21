const mongoose=require("mongoose");

const ideaSchema = new mongoose.Schema({
    Pcolor:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    Comment:{
        type:[String],
    },
    likeCount:{
        type:Number,
        default:0,
    }
});

module.exports = mongoose.model("Idea",ideaSchema);