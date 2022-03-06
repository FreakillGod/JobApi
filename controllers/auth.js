const User=require('../models/User')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError} =require('../errors')

const bcrypt = require('bcryptjs')

const registerUser= async(req,res)=>{
    // const {name,email,password}= req.body;
    
    // if(!name || !email || !password){
    //     throw new BadRequestError('please provid name, email, password correctly');
    // }

    // const {name , email , password}=req.body;

    // const salt= await bcrypt.genSalt(10);       //10 = number of rounds on bytes 
    // const hashPassword= await bcrypt.hash(password,salt);

    // const tempUser= {name, email, password:hashPassword};

    const user= await User.create({...req.body})
    console.log(user)
    console.log(req.body)
    res.status(StatusCodes.CREATED).json({user})
}
const login= async=(req,res)=>{
    res.send('login')
}

module.exports={
    registerUser,
    login,
}