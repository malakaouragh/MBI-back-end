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
 