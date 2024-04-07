const express = require ('express');
const students = require('./../coontrollers/UserControllers')
const authController = require('./../coontrollers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(`/dashboard/students`,authController.protect,authController.restrictTo('admin'),students.GetAllStudents);
router.route('/students/:id').get(students.getOne).delete(authController.protect,students.deleteStudent);
//router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword',authController.protect,authController.updatePassword);
router.patch('/updateMe', authController.protect, students.update);
router.delete('/deleteMe', authController.protect, students.deleteMe);
//router.post('/forgotPassword', authController.forgotPassword);
  

module.exports = router;
