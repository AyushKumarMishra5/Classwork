const express=require("express");
const bcrypt=require("bcryptjs");
const user=require("../model/users");
const router=express.Router();

router.post("/register", async(req, res)=>{
    try{
        const{username, email, password} = req.body;
        let user = await User.findOne({email})
        if(user)
            return res.status(400).json({message: "User already exits"})
        user = new User({username, email, password});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch (error)
    {
        console.log("Error exited", error)
    }
})
