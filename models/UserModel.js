const mongoose=require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');



const validatePhoneNumber = (phoneNumber) => {
  // Use a regular expression to validate the phone number format
  const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneNumberRegex.test(phoneNumber);
};

const UserSchema = new mongoose.Schema({

    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      unique:true
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
    passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false}


  });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

UserSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });

UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };



const User = mongoose.model('User', UserSchema);
 module.exports=User;
