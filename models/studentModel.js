const mongoose=require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true // Ensures uniqueness of email addresses
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      default: 0
    }
  });

const Student = mongoose.model('Student', StudentSchema);
 module.exports=Student;
