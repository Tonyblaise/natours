const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    
}).then(con => {
    console.log('DB connection successful')
})

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = app;

// app.post('/', (req,res)=>{

//     res.send("You can post to this endpoint")
// })
//TEST