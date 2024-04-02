const express = require ('express')
const LanguageController =require( '../coontrollers/LanguageControllers');

const router = express.Router()
router.route('/languages').get(LanguageController.getalllanguages).post(LanguageController.create);
router.route('/languages/:id').get(LanguageController.getLanguage).delete(LanguageController.delete);


module.exports=router;