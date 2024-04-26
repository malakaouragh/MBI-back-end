const Activities=require('./../models/activityModel');
const APIFeatures = require('./../utils/APIfeautures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');



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
