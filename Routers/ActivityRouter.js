const express = require ('express');
const ActivityControllers=require('./../coontrollers/ActivityController');
const router = express.Router();
//router.post('/dashboard/news',newsfunctions.CreateNews);
router.get('/Activity',ActivityControllers.getallActivities);
module.exports=router;
