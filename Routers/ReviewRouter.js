const reviewController=require('./../coontrollers/ReviewControllers')
const express = require ('express')

const router = express.Router()

router.get('/Reviews',reviewController.getallReviews);

module.exports=router;