const express = require ('express');
const newsfunctions=require('./../coontrollers/NewsControllers');
const authController = require('./../coontrollers/authController');

const router = express.Router();
router.post('/dashboard/news',authController.protect,authController.restrictTo('admin'),newsfunctions.CreateNews);
router.get('/News',newsfunctions.getallNews);
router.route('/News/:id').get(newsfunctions.getOneNews).delete(authController.protect,authController.restrictTo('admin'),newsfunctions.delete);
module.exports=router;
