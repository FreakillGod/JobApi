const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userData=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'dont be anonymus'],
        minlength:3,
        maxlength:25,
    },
    email:{
        type:String,
        required:[true,'email ?????'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
        unique:[true,'email is already in use'],
    },
    password:{
        type:String,
        required:[true,'bad password:('],
        minlength:6,
    },
})

userData.pre('save',async function(){
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})

userData.methods.comparePassword= async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch;
}

userData.methods.getName = function(){
    return this.name;
}

userData.methods.jwtfy = function(){
    return jwt.sign({userId:this._id,name: this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

module.exports=mongoose.model('User',userData);