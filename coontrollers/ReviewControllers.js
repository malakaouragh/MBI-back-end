const Review=require('./../models/ReviewModel');
exports.getallReviews= async (req,res)=>{
    try{
     const reviews= await Review.find();
     res.status(200).json({
        status: 'success',
        results:reviews.length,      
        data:{
            reviews
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to get News', error: error.message });        
    }
 }

 exports.getOne= async (req,res)=>{
    try{
     const data= await Review.findById(req.params.id);
     res.status(200).json({
        status: 'success',
        data:{
            data
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to get ', err: err.message });        
    }
  }
 
  exports.createreview = async (req, res) => {
   try {
     // const newTour = new Tour({})
     // newTour.save()
 
     const newreview = await Review.create(req.body);
 
     res.status(201).json({
       status: 'success',
     });
   } catch (err) {
     res.status(400).json({
       status: 'fail',
       message: err
     });
   }
 };

exports.calculateAverageRating = async (req,res) => {
  try {
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
      data{
      avgRating: avgResult[0].avgRating,
      numberOfReviews
    
    }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.delete= async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};