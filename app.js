const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const express = require("express")
const rateLimit=require('express-rate-limit')
const AppError = require('./utils/appError')
const app = express();
const globalErrorHandler = require('./controllers/errorController')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const viewRouter = require('./routes/viewRoutes')



//1 Middlewares
//Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//limit requests from the same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message:'Too many requests from this IP, please try again in an hour'
    
})

app.use('/api', limiter)

//Set security HTTP headers
app.use(helmet())

//reading data from the body into req.body
app.use(express.json({ limit: '10kb' }))

//Data snitization against NOSQL query injection
app.use(mongoSanitize())

//Data sanitization against XSS
app.use(xss())

//prevent parameter pollution
app.use(hpp({
    whitelist:['duration','ratingsAverage','ratingsQuantity', 'maxGroupSize','difficulty','price']
}))

//serving static files
// app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(__dirname,'public')))




app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))
app.use('/api/v1/tours', tourRouter)



app.use('/', viewRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)




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
