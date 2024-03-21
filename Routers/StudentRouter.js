const express = require ('express');
const students = require('./../coontrollers/studentControllers')

const Studentrouter = express.Router();
//.post(`/login`,login)
Studentrouter.get(`/dashboard/students`,students.GetAllStudents);

module.exports = Studentrouter;
