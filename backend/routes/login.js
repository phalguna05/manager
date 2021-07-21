const express=require("express");
const router=express.Router();
const user=require('../models/user.js');
router.post('/fetchUser',async (req,res)=>{
    try{
        const users=await user.findOne({UserName:req.body.Username});
        if(users){
            return res.status(201).send({status:"success",User:users});
        }
        else{
            return res.status(201).send({status:"failure"});
        }
    }
    catch(error){
        res.status(404).send({message:error.message});
    }
});
router.post('/addUser',async(req,res)=>{
    const data={
        FullName:req.body.Fullname,
        UserName:req.body.Username,
        Email:req.body.Email,
        Mobile:req.body.Mobile,
        Password:req.body.Password
    }
    const newUser=new user(data);
    try{
        await newUser.save();
        res.status(201).send({status:"success"});
    }
    catch(error){
        res.status(409).send({message:error.message});
    }
});
module.exports=router;