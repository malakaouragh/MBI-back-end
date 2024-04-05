const News=require('./../models/NewsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.CreateNews= catchAsync(async (req, res, next) => {
    const {title,content,photo}=req.body;
    const newNews =new News({title,content,photo});
    await newNews.save();
    res.status(201).json({message:'the news id crfeated successfully'});
  });

exports.getallNews= catchAsync(async (req, res, next) => {
    const theNews= await News.find();
    res.status(200).json({
       status: 'success',
       results: theNews.length,      
       data:{
           theNews
       }
       
    })
  
});

exports.getOneNews=catchAsync(async (req, res, next) => {
    const data= await News.findById(req.params.id);

    if (!data) {
      return next(new AppError('No news found with that ID', 404));
    }

    res.status(200).json({
       status: 'success',
       data:{
           data
       }
       
    })

 });

 exports.delete=catchAsync(async (req, res, next) => {
     const rev = await News.findByIdAndDelete(req.params.id);

     if (!rev) {
      return next(new AppError('No news found with that ID', 404));
    }
 
     res.status(204).json({
       status: 'success',
       data: null
     });
  
 });
 
