const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    
    
}).then(() => {
    console.log('DB connection successful')
}).catch(err=> console.log(err))

const app = require('./app');

const port = process.env.PORT || 3000;
const server =app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

process.on('unhandledRejection', () => {
    console.log(err.name, err.message)
    console.log('UNHANDLED REJECTION! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
    
})
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...')
  
    
    server.close(() => {
        process.exit(1)
    })
    
})

// app.post('/', (req,res)=>{

//     res.send("You can post to this endpoint")
// })
//TEST