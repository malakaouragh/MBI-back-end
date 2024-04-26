const { Certificate } = require('crypto');
const mongoose=require('mongoose');
const { type } = require('os');

const CourseSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,    },
    description: String,
    instructor: {
      type: String,
      required: true
    },
    price: {
      type: Number||String,
      required: true,
      default:0
    },
    duration: {
      type: Number,
      required: true
    },
    studentsEnrolled: {
      type: Number,
      default: 0
    },
    maxStudents:{
      type:Number,
      default:30   },
    photoUrl: String, 
    level: {
      type: String,
      enum: ['A1', 'A2', 'B1','B2','C1','C2'],
      required: true
    },
    language: {
      type: mongoose.Schema.ObjectId,
      ref: 'Language',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
const Course = mongoose.model('Course', CourseSchema);

module.exports=Course;

