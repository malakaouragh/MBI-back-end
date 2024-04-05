const express = require ('express');
const students = require('./../coontrollers/UserControllers')
const authController = require('./../coontrollers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(`/dashboard/students`,authController.protect,authController.restrictTo('admin'),students.GetAllStudents);
router.route('/students/:id').get(students.getOne).patch(authController.protect,students.update).delete(authController.protect,students.deleteStudent);

module.exports = router;
