const express = require ('express')
const courseController=require('./../coontrollers/CourseControllers');
const authController = require('./../coontrollers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').post(authController.protect,authController.restrictTo('Student'),courseController.createCourse).delete(authController.protect,authController.restrictTo('admin'),courseController.delete);

module.exports=router;