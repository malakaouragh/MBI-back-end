const express = require('express');
const app=express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./coontrollers/errorController');

const studentRoutes =require('./Routers/StudentRouter');
const contactRoutes = require('./Routers/ContactRouter'); 
const newsRoutes =require('./Routers/NewsRouter');
const languageRout = require('./Routers/LanguageRouter');
const reviewRout = require('./Routers/ReviewRouter');
const ActivityRout=require('./Routers/ActivityRouter');
const CourseRoute=require('./Routers/CourseRouter');


// Set security HTTP headers
app.use(helmet());

app.use(express.static(`${__dirname}/view`));

const limiter = rateLimit({
  max: 10,
  windowMs: 30 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in a half hour!'
});
app.use('/', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
/*app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);*/
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
