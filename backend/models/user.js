const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true 
    },
    Mobile:{
        type:String,
        required:true 
    },
    Password:{
        type:String,
        required:true
    }
});
const user=mongoose.model("user",userSchema);
module.exports=user;