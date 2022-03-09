const mongoose= require('mongoose')

const JobSchema= new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name'],
        maxlength:40,
    },
    position:{
        type:String,
        required:[true,'please provide position name'],
        maxlength:20,
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provid user']
    }
},{timestamps:true})


module.exports=mongoose.model('Job',JobSchema);