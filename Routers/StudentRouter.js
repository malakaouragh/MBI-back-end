const express = require ('express');
const students = require('./../coontrollers/studentControllers')

const router = express.Router();
//.post(`/login`,login)
router.get(`/dashboard/students`,students.GetAllStudents);
router.get('/students/:id',students.getOne);

module.exports = router;
