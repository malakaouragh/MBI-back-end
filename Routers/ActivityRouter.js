const express = require ('express');
const ActivityControllers=require('./../coontrollers/ActivityController');
const authController = require('./../coontrollers/authController');

const router = express.Router();
//router.post('/dashboard/news',newsfunctions.CreateNews);
router.route('/Activity').get(ActivityControllers.getallActivities).post(authController.protect,authController.restrictTo('admin'),ActivityControllers.createActivity);
router.route('/Activity/:id').get(ActivityControllers.getActivity).delete(authController.protect,authController.restrictTo('admin'),ActivityControllers.delete);
module.exports=router;
