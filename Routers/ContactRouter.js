const express = require ('express')

const router = express.Router()
const contactController = require('../coontrollers/ContactControllers');

router.post('/contact', contactController.sendMessage);
router.get('/dashboard/contact',contactController.getAllmessages);
router.get('/contact/:id',contactController.getContact);
 


module.exports = router;