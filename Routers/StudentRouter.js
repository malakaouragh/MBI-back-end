const express = require ('express');
const students = require('./../coontrollers/studentControllers')

const router = express.Router();
//.post(`/login`,login)
router.get(`/dashboard/students`,students.GetAllStudents);
router.route('/students/:id').get(students.getOne).patch(students.update).delete(students.deleteStudent);

module.exports = router;
