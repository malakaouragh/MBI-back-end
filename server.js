const dotenv = require('dotenv');
const mongoose=require('mongoose');
const app = require('./app');
dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
    )
.then(()=>{console.log("connected to mongodb")})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);}
    );

app.listen(3000,()=>{
    console.log(`app is running on ..5000...`)
})