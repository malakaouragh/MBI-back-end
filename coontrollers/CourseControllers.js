const Course=require('./../models/CourseModel');
const Language=require('./../models/LanguageModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


/*exports.createCourse = catchAsync(async (req, res, next) => {
      // Extract course details and language ID from request body
  
      // Create the course using .create() method
      const newCourse = await Course.create(req.body);
  
      // Find the language document by its ID
      const language = await Language.findById(languageId);
      if (!language) {
        return next(new AppError('No language found with that ID', 404));
      }
  
      // Push the new course into the courses array of the language document
      language.courses.push(newCourse);
  
      // Save the language document to update the courses array
      await language.save();
  
      res.status(201).json({ message: 'Course created successfully' });
  });*/

exports.createCourse = catchAsync(async (req, res, next) => {

    if(!req.body.tour) req.body.language=req.params.LanguageId;    
    const newCourse = await Course.create(req.body);
    
    res.status(201).json({ message: 'Course created successfully' });

    
    });


exports.delete= catchAsync(async (req, res, next) => {
      const cour =await Course.findByIdAndDelete(req.params.id);
  
      if (!cour) {
        return next(new AppError('No course found with that ID', 404));
      }
      res.status(204).json({
        status: 'success',
        data: null
      });

  });