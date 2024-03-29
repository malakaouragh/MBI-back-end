const reviewController=require('./../coontrollers/ReviewControllers')
const express = require ('express')

const router = express.Router()

router.get('/Reviews',reviewController.getallReviews);
router.get('/Reviews/:id',reviewController.getOne);

module.exports=router;