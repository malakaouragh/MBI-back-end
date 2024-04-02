const mongoose=require('mongoose');
const Course = require('./CourseModel');

const LanguageSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{type:String},
    courses: [Course.schema]
 });
 const Language = mongoose.model('Language', LanguageSchema);

 module.exports=Language;

