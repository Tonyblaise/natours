const fs = require('fs')
const morgan = require('morgan')
const express = require("express")
const AppError = require('./utils/appError')
const app = express();
const globalErrorHandler = require('./controllers/errorController')

//1 Middlewares

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))




const tourRouter = require('./routes/tourRoutes.js')
const userRouter=require('./routes/userRoutes')

app.use('/api/v1/tours', tourRouter)

app.use('/api/v1/users', userRouter)




// app.get('/', (req, res)=>{

//     res.status(200).json({"message": 'Hello from the server side'})
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.all('*', (req, res, next) => {
//     res.status(404).json({
//         status: 'fail',
//         message:`Can't find ${req.originalUrl} on this server!`
//     })
    
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
 }
    
)

//implemmenting global error handling middleware
app.use(globalErrorHandler)


//Middlewares
module.exports=app



//Get all tours










//Start server
