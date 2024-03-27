const mongoose=require('mongoose');
const ActivitySchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    descreption: {
      type: String,
      required: true
    },
    location:{
        type:String,
        
    },

    photo: {
      type: String,
      required: true 
     // default :after the design
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    timing:{
        type:Date,
    }
  });
  const activity = mongoose.model('activity', ActivitySchema);

  module.exports=activity;
