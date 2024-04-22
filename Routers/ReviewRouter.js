const reviewController=require('./../coontrollers/ReviewControllers');
const authController = require('./../coontrollers/authController');

const express = require ('express')

const router = express.Router()

router.route('/Reviews').get(reviewController.getallReviews).post(authController.protect,authController.restrictTo('Student'),reviewController.setTourUserIds,reviewController.createreview);
router.route('/Reviews/:id').get(reviewController.getOne).delete(authController.restrictTo('Student', 'admin'),reviewController.delete);
router.get('/Average-rating',reviewController.calculateAverageRating);

module.exports=router;