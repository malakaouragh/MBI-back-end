const Contact=require('./../models/ContactModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');


exports.sendMessage = catchAsync(async (req, res, next) => {
      const { name,lastname, email, message } = req.body;

      
      await sendEmail({
        sen :email,
        rec: 'garth.bahringer@ethereal.email',
        subject: message[10],
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'contact sent '
      });
    
  });

exports.getAllmessages=catchAsync(async (req, res, next) => {

    const messages= await Contact.find();
            res.status(200).json({
            status: 'success',
            results: messages.length,
            data:{
                 messages}
        })

});
exports.getContact= catchAsync(async (req, res, next) => {

   const contact= await Contact.findById(req.params.id);

   if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }
   res.status(200).json({
      status: 'success',
      data:{
          contact
      }
      
   });

});

exports.delete= catchAsync(async (req, res, next) => {

    const contact =await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return next(new AppError('No contact found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });

});

