const News=require('./../models/NewsModel');
exports.CreateNews= async (req,res)=>{
   try {
    const {title,content,photo}=req.body;
    const newNews =new News({title,content,photo});
    await newNews.save();
    res.status(201).json({message:'the news id crfeated successfully'});
   }catch(err){
    res.status(500).json({message:'There is an error'});
   }
};

