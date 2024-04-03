const express = require ('express')

const router = express.Router()
const contactController = require('../coontrollers/ContactControllers');

router.post('/contact', contactController.sendMessage);
router.get('/dashboard/contact',contactController.getAllmessages);
router.route('/contact/:id').get(contactController.getContact).delete(contactController.delete);
 


module.exports = router;