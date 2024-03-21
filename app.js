const express = require('express');
const app=express();
const contactRoutes = require('./Routers/ContactRouter'); 
const studentRoutes =require('./Routers/StudentRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/view`));

console.log(process.env)
//
app.use(contactRoutes);
app.use(studentRoutes);
module.exports = app;
