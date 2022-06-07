const fs = require('fs')
const dotenv = require('dotenv');
const Tour = require("./../../models/tour_model")
const Review = require('./../../models/review_model')
const User = require('./../../models/usermodel')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection successful')
})


//READ JSON FILE

const tours =JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews =JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))


//IMPORT DATA INTO THE DATABASE
const importData = async () => {
    try {
        await Tour.create(tours)
        await User.create(users,{validateBeforeSave:false})
        await Review.create(reviews)

        console.log("Data successfully loaded")
        
    } catch (err) {
        console.log(err)
    }process.exit()
}

//DELETE ALL DATA FROM COLLECTION
const deleteData=async () => {
    try {
        await Tour.deleteMany()
        await User.deleteMany()
        await Review.deleteMany()
        console.log("Data successfully deleted")
       
    } catch (err) {
        console.log(err)
    }
     process.exit()
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}
// console.log(process.argv)