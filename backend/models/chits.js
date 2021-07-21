const mongoose=require("mongoose");
const chitSchema=mongoose.Schema({
    ChitName:{
        type:String,
        required:true
    },
    StartDate:{
        type:String,
        required:true 
    },
    Months:{
        type:String,
        required:true
    },
    Members:{
        type:String,
        required:true
    },
    EndDate:{
        type:String,
        required:true
    },
    Template:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required:true
    },
    ChitMembers:{
        type:[String],
        required:true
    },
    DueList:{
        type:[String],
        required:true
    },
    Transactions:{
        type:[String],
        required:true
    }

});
const chits=mongoose.model("chits",chitSchema);
module.exports=chits;