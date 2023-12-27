const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register =async (req,res,next)=>{
    try{
        const{username,email,password}=req.body;
        const usernameCheck=await User.findOne({username});
        if(usernameCheck)
            return res.status(400).json({message:"Username already exists"});
        const emailCheck=await User.findOne({email});
        if(emailCheck)
            return res.status(400).json({message:"Email already exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const user= await User.create({
            username,
            email,
            password:hashedPassword,
        });
        delete user.password;
        return res.status(201).json(user);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    
};

module.exports.login =async (req,res,next)=>{
    try{
        const{username,password}=req.body;
        const user=await User.findOne({username});
        if(!user)
            return res.json({msg:"Incorrect Username or Password",status:false});
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
            return res.json({msg:"Incorrect Username or Password",status:false});
        delete user.password;     
        return res.json({status:true,user});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    
};