const Activities=require('./../models/activityModel');
const APIFeatures = require('./../utils/APIfeautures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/Activity');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `activity-${req.body.title}-${Date.now()}.${ext}`);
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

exports.uploadPhoto = upload.single('photo');




exports.getallActivities=catchAsync(async (req, res, next) => {


     const theActivities= await Activities.find();
     res.status(200).json({
        status: 'success',
        results: theActivities.length,      
        data:{
            theActivities
        }
        
     })
 });

exports.getActivity= catchAsync(async (req, res, next) => {
     const theActivities= await Activities.findById(req.params.id);

     if(!theActivities){
      return next(new AppError('No course found with that ID', 404));
    }
     res.status(200).json({
        status: 'success',
        data:{
            theActivities
        }
        
     })

 });

exports.createActivity = catchAsync(async (req, res, next) => {

  if (req.file) req.body.photo = req.file.filename;
     const newActivity = await Activities.create(req.body);
 
     res.status(201).json({
       status: 'success',
     });
 });

exports.delete= catchAsync(async (req, res, next) => {
    const ACT=await Activities.findByIdAndDelete(req.params.id);

    if(!ACT){
      return next(new AppError('No course found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });

  
});
