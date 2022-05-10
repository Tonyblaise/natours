const { enabled } = require('express/lib/application')
const fs = require('fs')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/usermodel')
const APIFeatures = require('./../utils/apiFeatures.js')
const AppError = require('./../utils/appError')


const filterObj = (obj, ...allowedFields) => {

    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el]=obj[el]
    })

    return newObj
}

exports.getAllUsers = catchAsync (async (req, res, next) => {
    const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate()
       const users = await features.query;
        
       

    res.status(200).json({
        "status": "success",
        results: users.length,
        "data":{
            users
        }
    })
})

exports.updateMe =  catchAsync(async (req, res, next) => {
    //create an error if the user posts password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /update Password', 400))
    }

    //filter out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email')
    //update the user document

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new:true, runValidators:true
    })

   
  


    res.status(200).json({
        status: "success",
        data:{
            user: updatedUser
        }
    })
    


})
exports.getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:"This route is not yet defined"
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined"
    })
}
exports.updateUser = (req, res) => {
        res.status(500).json({
            status: 'error',
            message: "This route is not yet defined"
        })
    }


exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    
    res.status(204).json({
        status: "success",
        data: null
    })
})