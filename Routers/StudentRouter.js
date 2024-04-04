const express = require ('express');
const students = require('./../coontrollers/UserControllers')
const authController = require('./../coontrollers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get(`/dashboard/students`,students.GetAllStudents);
router.route('/students/:id').get(students.getOne).patch(students.update).delete(students.deleteStudent);

module.exports = router;
