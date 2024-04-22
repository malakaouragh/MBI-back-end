const mongoose=require('mongoose');
const User = require('./UserModel');
const ReviewSchema = mongoose.Schema({
  
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
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
    );

    ReviewSchema.pre(/^find/, function(next) {
      this.populate({
        path: 'user',
        select: 'name photo'
      });
      next();
    });

const Review = mongoose.model('Review', ReviewSchema);

module.exports=Review;
