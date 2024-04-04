const dotenv = require('dotenv');
const mongoose=require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
    )
.then(()=>{console.log("connected to mongodb")})

    const server=app.listen(3000,()=>{
    console.log(`app is running on ..3000...`)
});


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});