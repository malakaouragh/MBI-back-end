const mongoose=require('mongoose');
const Course = require('./CourseModel');

const LanguageSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    courses: [Course.schema]
 });
 const Language = mongoose.model('Language', LanguageSchema);

 module.exports=Language;

