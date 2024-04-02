const express = require ('express')
const LanguageController =require( '../coontrollers/LanguageControllers');

const router = express.Router()
router.route('/languages').get(LanguageController.getalllanguages).post(LanguageController.create);
router.get('/languages/:id',LanguageController.getLanguage);


module.exports=router;