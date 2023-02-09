const mongoose = require("mongoose")
const { Schema } = mongoose;

const fileName = new Schema({
    filename:{
        type:String,
        required:[true,"Name is required"],
    },
    file:{
        type:String,
        required:[true,"file is required"]
    }
});

module.exports=mongoose.model("File",fileName)