const mongoose=require('mongoose');
const validator = require('validator');


const validatePhoneNumber = (phoneNumber) => {
  // Use a regular expression to validate the phone number format
  const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneNumberRegex.test(phoneNumber);
};

const UserSchema = new mongoose.Schema({

    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    photo: String,
  role: {
    type: String,
    enum: ['Student', 'admin'],
    default: 'Student'
  },
    createdAt: {
      type: Date,
      default: Date.now
    },
    firstName:{
      type: String,
    },
    lastName:{
      type: String,
    },
    DateOfBirth:{
      type: Date,
    },
    PlaceOfBirth:{
      type: String,
    },
    PhoneNumber:{
      type: String,
      validate: {
        validator: validatePhoneNumber,
        message: 'Invalid phone number format'
      }
    },
    GuardianName:{
      type: String,
    },
    Gardianemail:{
      type: String,
    },
    GardianPhonenum:{
      type: String,
      validate: {
        validator: validatePhoneNumber,
        message: 'Invalid phone number format'
      }
    },
    Adress:{
      type: String,
    },


  });



const User = mongoose.model('User', UserSchema);
 module.exports=User;
