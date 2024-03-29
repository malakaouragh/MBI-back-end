const express = require ('express')
const LanguageController =require( '../coontrollers/LanguageControllers');

const router = express.Router()
router.get('/languages',LanguageController.getalllanguages);
router.get('/languages/:id',LanguageController.getLanguage);


module.exports=router;