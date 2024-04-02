const mongoose=require('mongoose');
const ReviewSchema = mongoose.Schema({
  user: {
    type: String, // Assuming the username is a string
    required: true
   },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
    });
const Review = mongoose.model('Review', ReviewSchema);

module.exports=Review;
