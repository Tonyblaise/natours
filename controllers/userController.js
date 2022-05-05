const fs = require('fs')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/usermodel')
const APIFeatures = require('./../utils/apiFeatures.js')

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

    exports.deleteUser = (req, res) => {
        res.status(500).json({
            status: 'error',
            message: "This route is not yet defined"
        })
    }
