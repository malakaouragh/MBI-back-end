const express = require('express');
const app=express();
const contactRoutes = require('./Routers/ContactRouter'); 
const studentRoutes =require('./Routers/StudentRouter');
const newsRoutes =require('./Routers/NewsRouter');
app.use(express.json());
app.use(express.static(`${__dirname}/view`));

//
app.use(contactRoutes);
app.use(studentRoutes);
app.use(newsRoutes);
module.exports = app;
