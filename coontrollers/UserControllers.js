const Student=require('../models/UserModel');
const APIFeatures = require('../utils/APIfeautures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const auth=require('./authController')
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});


const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');




exports.getme = catchAsync(async (req, res, next) => {
  const me =await Student.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: me
  });
});

exports.GetAllStudents= catchAsync(async (req, res, next)=>{
    const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
  const students = await features.query;

        res.status(200).json({
            status: 'success',
            results: students.length,
            data:{
                 students}
        })

});

exports.getOne= catchAsync(async (req, res, next) => {
     const data= await Student.findById(req.params.id);

     if (!data) {
      return next(new AppError('No student found with that ID', 404));
    }

     res.status(200).json({
        status: 'success',
        data:{
            data
        }
        
     })
    
  });

exports.deleteStudent =catchAsync(async (req, res, next) => {
      const student =await Student.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null
      });

  });

exports.update = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }

   // 2)photo
   if (req.file) req.body.photo = req.file.filename;

  
  
    // 3) Update user document
    const updatedUser = await Student.findByIdAndUpdate(req.user.id,req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });

exports.deleteMe = catchAsync(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
exports.getUserCourses = catchAsync(async (req, res, next) => {
    const user = await Student.findById(req.user.id).populate({
      path: 'courses',
      populate: {
          path: 'course', // Populating the course field within each course document
          select: 'title description instructor studentsEnrolled level language ' // Selecting specific fields from the course document
      }})

    if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    const userCourses = user.courses;
    //userCourses = userCourses.slice(0, -2);
    res.status(200).json({userCourses});
});


// Controller function to add a certificate for a specific course to a user
exports.addCertificateToUser = catchAsync(async (req, res) => {
        const { courseId, certificate } = req.body; 
        // Assuming , courseId, and certificate are sent in the request body
        const userId=req.params.userId;
        // Find the user by ID
        const user = await Student.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        const existingCourseIndex = user.courses.findIndex(course => course.course.equals(courseId));
        if (existingCourseIndex === -1) {
          return res.status(404).json({ status: 'fail', message: 'Course not found for this user' });
      }

      // Update the certificate for the specific course
      user.courses[existingCourseIndex].certificate = certificate;

      // Save the changes
      await user.save();
        return res.status(200).json({ status: 'success', message: 'Certificate added successfully' });
});

  