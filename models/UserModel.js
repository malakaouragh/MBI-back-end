const mongoose=require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


function validatePhoneNumber(phoneNumber) {
  // Remove any non-digit characters from the phone number
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Check if the phone number contains exactly 10 digits
  if (digitsOnly.length === 10) {
    return true; // Valid phone number
  } else {
    return false; // Invalid phone number
  }
}

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
    select: false},
    courses: [
      {
          course: {
              type: mongoose.Schema.ObjectId,
              ref: 'Course'
          },
          certificate: {
              type: String
          }
      }
  ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

UserSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
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


UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

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
  

UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
const User = mongoose.model('User', UserSchema);
 module.exports=User;
