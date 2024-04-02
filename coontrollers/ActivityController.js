const Activities=require('./../models/activityModel');
const APIFeatures = require('./../utils/APIfeautures');

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
 exports.getActivity= async (req,res)=>{
    try{
     const theActivities= await Activities.find(req.params.id);
     res.status(200).json({
        status: 'success',
        data:{
            theActivities
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to get activities', error: err.message });        
    }
 }

 exports.createActivity = async (req, res) => {
   try {
 
     const newActivity = await Activities.create(req.body);
 
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

exports.delete= async (req, res) => {
  try {
    await Activities.findByIdAndDelete(req.params.id);

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
