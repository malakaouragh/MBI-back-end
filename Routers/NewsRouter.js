const express = require ('express');
const newsfunctions=require('./../coontrollers/NewsControllers');
const router = express.Router();
router.post('/dashboard/news',newsfunctions.CreateNews);
module.exports=router;
