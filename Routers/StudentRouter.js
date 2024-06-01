const express = require("express");
const students = require("./../coontrollers/UserControllers");
const authController = require("./../coontrollers/authController");
const courseController = require("./../coontrollers/CourseControllers");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get(
  `/dashboard/students`,
  authController.protect,
  students.GetAllStudents
);
router
  .route("/students/:id")
  .get(students.getOne)
  .delete(authController.protect, students.deleteStudent);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.patch("/updateMe", authController.protect, students.update);
router.delete("/deleteMe", authController.protect, students.deleteMe);
router.post("/forgotPassword", authController.forgotPassword);
router.get(
  `/purchasedCourses`,
  authController.protect,
  students.getUserCourses
);
router.get("/me", authController.protect, students.getme);
router.get("/Earnings", courseController.getEarnings);
router.post("/certeficate/:userId", students.addCertificateToUser);
module.exports = router;
