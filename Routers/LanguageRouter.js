const express = require ('express')
const LanguageController =require( '../coontrollers/LanguageControllers');
const authController = require('./../coontrollers/authController');
const courserouter=require('./CourseRouter')

const router = express.Router()


router.use('/:LanguageId/Courses', courserouter);


router.route('/').get(LanguageController.getalllanguages).post(authController.protect,authController.restrictTo('admin'),LanguageController.create);
router.route('/:id').get(LanguageController.getLanguage).delete(authController.protect,authController.restrictTo('admin'),LanguageController.delete);


module.exports=router;