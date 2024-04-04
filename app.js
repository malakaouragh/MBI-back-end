const express = require('express');
const app=express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./coontrollers/errorController');

const studentRoutes =require('./Routers/StudentRouter');
const contactRoutes = require('./Routers/ContactRouter'); 
const newsRoutes =require('./Routers/NewsRouter');
const languageRout = require('./Routers/LanguageRouter');
const reviewRout = require('./Routers/ReviewRouter');
const ActivityRout=require('./Routers/ActivityRouter');
const CourseRoute=require('./Routers/CourseRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/view`));


//
app.use(ActivityRout);
app.use(contactRoutes);
app.use(studentRoutes);
app.use(newsRoutes);
app.use(languageRout);
app.use(reviewRout);
app.use(CourseRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

module.exports = app;
