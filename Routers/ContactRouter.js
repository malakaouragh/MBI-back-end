const express = require ('express')

const router = express.Router()
const contactController = require('../coontrollers/ContactControllers');

router.post('/contact', contactController.sendMessage);
router.get('/dashboard/contact',contactController.getAllmessages);

module.exports = router;