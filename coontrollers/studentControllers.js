const Student=require('./../models/studentModel');
const APIFeatures = require('./../utils/APIfeautures');

exports.GetAllStudents= async (req,res)=>{
   try{ 

    const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
  const students = await features.query;

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

exports.deleteStudent = async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
  
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

exports.update = async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  