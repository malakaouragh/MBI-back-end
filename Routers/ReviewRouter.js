const reviewController=require('./../coontrollers/ReviewControllers');
const authController = require('./../coontrollers/authController');

const express = require ('express')

const router = express.Router()

router.route('/Reviews').get(reviewController.getallReviews).post(reviewController.createreview);
router.route('/Reviews/:id').get(reviewController.getOne).delete(reviewController.delete);
router.get('/Average-rating',reviewController.calculateAverageRating);

module.exports=router;