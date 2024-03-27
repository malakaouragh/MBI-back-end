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
