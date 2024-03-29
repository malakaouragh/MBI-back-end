const Student=require('./../models/studentModel');

exports.GetAllStudents= async (req,res)=>{
   const students= await Student.find();
   try{ 
        res.status(200).json({
            status: 'success',
            results: students.length,
            data:{
                 students}
        })
    }
    catch(err){
       res.status(404).json({
        status:'fail',
        message:err,

       });
        
    }
}

exports.getOne= async (req,res)=>{
    try{
     const data= await Student.findById(req.params.id);
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