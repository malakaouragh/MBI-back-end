const News=require('./../models/NewsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/news');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `news-${req.body.title}-${Date.now()}.${ext}`);
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



exports.CreateNews= catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;
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
 
