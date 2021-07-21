const express=require("express");
const router=express.Router();
const chit=require('../models/chits.js');
router.post('/getChits',async (req,res)=>{
    try{
        const chits=await chit.find({UserId:req.body.userId});
        if(chits){
            return res.status(201).send({status:"success",Chits:chits});
        }
        else{
            return res.status(201).send({status:"failure"});
        }
    }
    catch(error){
        res.status(404).send({message:error.message});
    }
});
router.post('/createChit',async (req,res)=>{
        const data={
            ChitName:req.body.chit_name,
            StartDate:req.body.start_date,
            Months:req.body.months,
            Members:req.body.members,
            EndDate:req.body.end_date,
            Template:req.body.template,
            UserId:req.body.user_id,
            ChitMembers:req.body.chit_members,
            DueList:req.body.due_lists,
            Transactions:req.body.transactions
        }
        const newChit=new chit(data);
        try{
            await newChit.save();
            const chitData=await chit.findOne({ChitName:req.body.chit_name});
        
            res.status(201).send({status:"success",ChitData:chitData});
        }
        catch(error){
            res.status(409).send({message:error.message});
        }
});
router.post('/addMember',async (req,res)=>{
    try{
        console.log(req.body);
        const chitDetails=await chit.findOne({_id:req.body.chit_id});
        
        var newChitDetails=chitDetails;
        newChitDetails.ChitMembers.push(req.body.customer_id);
        var arr=newChitDetails.ChitMembers;
        console.log(newChitDetails);
        await newChitDetails.save();
        res.status(201).send({status:"success",ChitMembers:arr});
       
    }
    catch(error){
        res.status(409).send(error.message);
    }
});
router.post('/getMembers',async (req,res)=>{
    try{
        const chitDetails=await chit.findOne({ChitName:req.body.chit_name});
        var arr=chitDetials.ChitMembers;
        res.status(201).send({status:"success",ChitMembers:arr});
       
    }
    catch(error){
        res.status(409).send(error.message);
    }
});
module.exports=router;