const Course = require("./../models/CourseModel");
const User = require("./../models/UserModel");
const Language = require("./../models/LanguageModel");
const Earnings = require("./../models/MbiEarning");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createCourse = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.language = req.params.LanguageId;
  const newCourse = await Course.create(req.body);

  res.status(201).json({ message: "Course created successfully" });
});

exports.delete = catchAsync(async (req, res, next) => {
  const cour = await Course.findByIdAndDelete(req.params.id);

  if (!cour) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      data: courses,
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.LanguageId) filter = { language: req.params.LanguageId };

  const courses = await Course.find(filter);
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      data: courses,
    },
  });
});

exports.purchaseCourse = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id); // Assuming user is authenticated and user ID is available in the request
  const course = await Course.findById(req.params.courseId);

  if (course.studentsEnrolled >= course.maxStudents) {
    return res.status(500).json({
      message: "Sorry, the places are no longer available",
    });
  }

  let globalEarnings = await Earnings.findOne();
  if (!globalEarnings) {
    globalEarnings = await Earnings.create({});
  }
  globalEarnings.Total = (globalEarnings.Total || 0) + course.price;
  await globalEarnings.save();

  course.studentsEnrolled++;
  await course.save();

  // Add the purchased course to the user's courses array with the certificate field set to null
  user.courses.push({ course: course._id, certificate: null });
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Course purchased successfully",
  });
});

exports.getEarnings = catchAsync(async (req, res, next) => {
  const totalEarnings = await Earnings.findOne();
  res.status(200).json({
    data: totalEarnings.Total,
  });
});
