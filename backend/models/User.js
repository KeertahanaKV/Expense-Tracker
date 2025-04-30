const bycrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);
//Hashpassword before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password=await bycrypt.hash(this.password,10)
})

userSchema.methods.comparePassword= async function(candidatePassword){
    return await bycrypt.compare(candidatePassword,this.password)
}

module.exports=mongoose.model("User",userSchema)