const express = require ('express')
const LanguageController =require( '../coontrollers/LanguageControllers');

const router = express.Router()
router.get('/languages',LanguageController.getalllanguages);

module.exports=router;