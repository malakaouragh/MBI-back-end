const mongoose=require('mongoose');

const AdminSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true 
    },
    password: {
      type: String,
      required: true
    },
    Earnings: {
      type: Number,
      default: 0
    }
  });

const Student = mongoose.model('Admin', StudentSchema);
module.exports=Admin;
