const User=require('../models/User')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, UnauthenticatedError} =require('../errors')

// const jwt = require('jsonwebtoken')

// const bcrypt = require('bcryptjs')


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
    // const token=jwt.sign({userId:user._id, name:user.name, }, 'jwtSecret', {expiresIn:'3d'});

    const token = user.jwtfy();
    console.log(user)
    console.log(req.body)
    res.status(StatusCodes.CREATED).json({user:{name:user.getName()},token})
}
const login = async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
        throw new BadRequestError('please provide eamil and pass')
    }
    const user= await User.findOne({email});
    //compare password
    if(!user){
        throw new UnauthenticatedError('email is invalid');
    }

    const isPasswordCorrect= await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('password is invalid')
    }
    const token =user.jwtfy();

    res.status(StatusCodes.OK).json({user:{name:user.name},token})
    
}

module.exports={
    registerUser,
    login,
}