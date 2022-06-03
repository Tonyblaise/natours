const fs = require('fs');
const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController')
const reviewRouter= require('./../routes/reviewRoutes')


// router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-tours').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/').get(authController.protect,tourController.getAllTours).post(tourController.createNewTour);

router.route('/:id').get(tourController.getTour)
.patch(tourController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// router.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('user'),reviewController.createReview)


// 

module.exports=router