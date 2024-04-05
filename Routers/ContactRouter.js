const express = require ('express')

const router = express.Router()
const contactController = require('../coontrollers/ContactControllers');
const authController = require('./../coontrollers/authController');


router.post('/contact', contactController.sendMessage);
router.get('/dashboard/contact',authController.protect,authController.restrictTo('admin'),contactController.getAllmessages);
router.route('/contact/:id').get(authController.protect,authController.restrictTo('admin'),contactController.getContact).delete(authController.protect,authController.restrictTo('admin'),contactController.delete);
 


module.exports = router;