const jwt=require("jsonwebtoken")
const User = require("../models/User")

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"})
}

exports.registerUser=async(req,res)=>{
       const{fullName,email,password,profileImageUrl}=req.body;
       //validation check for missing fields
       if(!fullName || !email || !password){
          return res.this.status(400).json({message:"All fields are requires"})
       }
       try{
        //check if emial already exist
        const existngUser=await user.findOne({email});
          if(!existngUser){
                return res.status(400).json({message:"Email already in use"})
          }
          //Create the user
          const user= await User.create({
             fullName,email,password,profileImageUrl
          })
          res.status(201).json({
                id: user._id,
                user,
                token :generateToken(user._id)
          })
       }
       catch(err){
           res.status(500).json({message:"Error registrig user",erro:err.message})
       }
}

exports.loginUser=async(req,res)=>{
    
}
exports.getUserInfo=async(req,res)=>{
    
}