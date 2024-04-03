const express = require ('express');
const ActivityControllers=require('./../coontrollers/ActivityController');
const router = express.Router();
//router.post('/dashboard/news',newsfunctions.CreateNews);
router.route('/Activity').get(ActivityControllers.getallActivities).post(ActivityControllers.createActivity);
router.route('/Activity/:id').get(ActivityControllers.getActivity).delete(ActivityControllers.delete);
module.exports=router;
