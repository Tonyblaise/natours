const fs = require('fs')
const morgan = require('morgan')
const express = require("express")
const app = express();

//1 Middlewares

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))




const tourRouter = require('./routes/tourRoutes.js')
const userRouter=require('./routes/userRoutes')

app.use('/api/v1/tours', tourRouter)

app.use('/api/v1/tours', userRouter)




// app.get('/', (req, res)=>{

//     res.status(200).json({"message": 'Hello from the server side'})
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


//Middlewares
module.exports=app



//Get all tours










//Start server
