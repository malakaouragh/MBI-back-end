const mongoose=require('mongoose');
const Course = require('./CourseModel');

const LanguageSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{type:String}},
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    });


 LanguageSchema.virtual('courses', {
  ref: 'Course',
  foreignField: 'language',
  localField: '_id'
});

 const Language = mongoose.model('Language', LanguageSchema);

 module.exports=Language;

