const Contact=require('./../models/ContactModel');
exports.sendMessage = async (req, res) => {
    try {
      const { name,lastname, email, message } = req.body;
      const newMessage = new Contact({ name,lastname, email, message });
      await newMessage.save();
      res.status(201).json({ message: 'Your message sent successfully we will reply as soon as possible' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
  };

exports.getAllmessages=async (req,res)=>{
    const messages= await Contact.find();
    try{
        res.status(200).json({
            status: 'success',
            results: messages.length,
            data:{
                 messages}
        })
    }
    catch(err){
       res.status(404).json({
        status:'fail',
        message:err,

       });
        
    }
}
exports.getContact= async (req,res)=>{
  try{
   const contact= await contact.findById(req.params.id);
   res.status(200).json({
      status: 'success',
      data:{
          contact
      }
      
   })
  }
  catch(err){
          res.status(500).json({ message: 'Failed to get activities', error: error.message });        
  }
}