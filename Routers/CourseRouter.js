const express = require("express");
const courseController = require("./../coontrollers/CourseControllers");
const authController = require("./../coontrollers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/courses")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    courseController.createCourse
  )
  .get(courseController.getAll)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    courseController.delete
  );

router
  .route("/courses/:id")
  .get(courseController.getAll)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    courseController.delete
  );
router.post(
  "/purchase/:courseId",
  authController.protect,
  courseController.purchaseCourse
);

module.exports = router;
