const Activities=require('./../models/activityModel');
exports.getallActivities= async (req,res)=>{
    try{
     const theActivities= await Activities.find();
     res.status(200).json({
        status: 'success',
        results: theActivities.length,      
        data:{
            theActivities
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to get activities', error: error.message });        
    }
 }
 
