const mongoose=require('mongoose');

const LanguageSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    courses: [CourseSchema]
 });
 const Language = mongoose.model('Language', LanguageSchema);

 module.exports=Language;

