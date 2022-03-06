const express=require('express')
const router=express.Router();

const {login,registerUser} = require('../controllers/auth')


router.post('/register',registerUser)
router.post('/register',login)

module.exports= router;