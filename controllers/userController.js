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

exports.getAllUsers = factory.getAll(User)

//do not update passwords with this
exports.updateUser =  factory.updateOne(User)   
exports.getUser=factory.getOne(User)
exports.deleteMe = factory.deleteOne(User)