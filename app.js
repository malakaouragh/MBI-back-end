const express = require('express');
const app=express();
const contactRoutes = require('./Routers/ContactRouter'); 
const studentRoutes =require('./Routers/StudentRouter');
const newsRoutes =require('./Routers/NewsRouter');
const languageRout = require('./Routers/LanguageRouter');
const reviewRout = require('./Routers/ReviewRouter');
app.use(express.json());
app.use(express.static(`${__dirname}/view`));

//
app.use(contactRoutes);
app.use(studentRoutes);
app.use(newsRoutes);
app.use(languageRout);
app.use(reviewRout);
module.exports = app;
