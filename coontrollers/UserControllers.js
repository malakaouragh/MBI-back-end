const Student=require('../models/UserModel');
const APIFeatures = require('../utils/APIfeautures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


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
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!student) {
        return next(new AppError('No student found with that ID', 404));
      }
  
      res.status(200).json({
        status: 'success',
      });

  });


  