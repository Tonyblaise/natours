const fs = require('fs');
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const authController = require('./../controllers/authController');


// router.param('id', tourController.checkID);

router.route('/top-5-tours').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/').get(tourController.getAllTours).post(tourController.createNewTour);

router.route('/:id')
 .get(tourController.getTour)
.patch(tourController.updateTour)
    .delete(tourController.deleteTour);




module.exports=router