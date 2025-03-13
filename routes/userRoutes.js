const express=require("express");
const bcrypt=require("bcryptjs");
const user=require("../model/user");
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
        res.status(500).json({message: "Error occured"})
    }
});

router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "Invalid credentials"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Invalid credentials"})
        res.status(200).json({message: "Login successfull"})
    }
    catch (error)
    {
        res.status(500).json({message: "Server error"})
    }
})

module.exports = router;
