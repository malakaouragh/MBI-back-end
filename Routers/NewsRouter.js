const express = require ('express');
const newsfunctions=require('./../coontrollers/NewsControllers');
const router = express.Router();
router.post('/dashboard/news',newsfunctions.CreateNews);
router.get('/News',newsfunctions.getallNews);
module.exports=router;
