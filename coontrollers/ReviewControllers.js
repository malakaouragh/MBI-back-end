const Review=require('./../models/ReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};


exports.getallReviews=catchAsync(async (req, res, next)=>{
     const reviews= await Review.find();

     res.status(200).json({
        status: 'success',
        results:reviews.length,      
        data:{
            reviews
        }
        
     })

 });

 exports.getOne=catchAsync(async (req, res, next)=>{
     const data= await Review.findById(req.params.id);

     if (!data) {
      return next(new AppError('No review found with that ID', 404));
    }
     res.status(200).json({
        status: 'success',
        data:{
            data
        }
        
     })

  });
 
  exports.createreview =catchAsync(async (req, res, next)=>{
 
     const newreview = await Review.create(req.body);
 
     res.status(201).json({
       status: 'success',
     });
 });

exports.calculateAverageRating = catchAsync(async (req, res, next)=>{
    const avgResult = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          numberOfReviews: { $sum: 1 },
        }
      }
    ]);
    res.status(200).json({
      data:{
      avgRating: avgResult[0].avgRating,
      numberOfReviews: avgResult[0].numberOfReviews,    
    }
    });

});

exports.delete= catchAsync(async (req, res, next)=>{
    rev=await Review.findByIdAndDelete(req.params.id);

    if (!rev) {
      return next(new AppError('No review found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
 
});