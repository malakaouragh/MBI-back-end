const mongoose=require('mongoose');
const NewsSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true 
     // default :after the design
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  const News = mongoose.model('News', NewsSchema);

  module.exports=News;
