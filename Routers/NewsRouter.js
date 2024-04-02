const express = require ('express');
const newsfunctions=require('./../coontrollers/NewsControllers');
const router = express.Router();
router.post('/dashboard/news',newsfunctions.CreateNews);
router.get('/News',newsfunctions.getallNews);
router.route('/News/:id').get(newsfunctions.getOneNews).delete(newsfunctions.delete);
module.exports=router;
