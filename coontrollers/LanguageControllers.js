const Language=require('./../models/LanguageModel');
exports.getalllanguages= async (req,res)=>{
    try{
     const languages= await Language.find();
     res.status(200).json({
        status: 'success',
        results: languages.length,      
        data:{
            languages
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to send message', error: error.message });        
    }
}

exports.getLanguage= async (req,res)=>{
    try{
     const language= await Language.findById(req.params.id);
     res.status(200).json({
        status: 'success',
        data:{
            language
        }
        
     })
    }
    catch(err){
            res.status(500).json({ message: 'Failed to get Language', err: err.message });        
    }
  }
  
