const express = require ('express')
const courseController=require('./../coontrollers/CourseControllers')

const router = express.Router()
router.route('/courses').post(courseController.createCourse).delete(courseController.delete);

module.exports=router;