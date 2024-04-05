const express = require ('express')
const courseController=require('./../coontrollers/CourseControllers');
const authController = require('./../coontrollers/authController');


const router = express.Router()
router.route('/courses').post(authController.protect,authController.restrictTo('admin'),courseController.createCourse).delete(authController.protect,authController.restrictTo('admin'),courseController.delete);

module.exports=router;