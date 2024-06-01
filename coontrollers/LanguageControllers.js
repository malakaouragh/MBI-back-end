const Language=require('./../models/LanguageModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/Language');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `language-${req.body.name}-${Date.now()}.${ext}`);
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



exports.getalllanguages= catchAsync(async (req, res, next) => {
     const languages= await Language.find();
     res.status(200).json({
        status: 'success',
        results: languages.length,      
        data:{
            languages
        }
        
     })

});

exports.getLanguage= catchAsync(async (req, res, next) => {
     const language= await Language.findById(req.params.id);

     if (!language) {
      return next(new AppError('No language found with that ID', 404));
    }

     res.status(200).json({
        status: 'success',
        data:{
            language
        }
        
     })

  });

exports.create = catchAsync(async (req, res, next) => {

      if (req.file) req.body.photo = req.file.filename;
      const newlanguage = await Language.create(req.body);
  
      res.status(201).json({
        status: 'success',
      });
    
  });

exports.delete= catchAsync(async (req, res, next) => {
     const lang= await Language.findByIdAndDelete(req.params.id);

      if (!lang) {
        return next(new AppError('No language found with that ID', 404));
      }
  
      res.status(204).json({
        status: 'success',
        data: null
      });
   
  });
  
