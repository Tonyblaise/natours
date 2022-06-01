const { enabled } = require('express/lib/application')
const fs = require('fs')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/usermodel')
const APIFeatures = require('./../utils/apiFeatures.js')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')


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

//do not update passwords with this
exports.updateMe =  factory.updateOne(User)

   
    
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


exports.deleteMe = factory.deleteOne(User)