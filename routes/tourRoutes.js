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
router.route('/monthly-plan/:year').get(authController.protect,authController.restrictTo('admin','lead-guide','guide'), tourController.getMonthlyPlan);


router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances)
router.route('/').get(authController.protect,tourController.getAllTours).post(authController.protect,authController.restrictTo('admin','lead-guide'), tourController.createNewTour);

router.route('/:id').get(tourController.getTour)
.patch(authController.protect,authController.restrictTo('admin','lead-guide'), tourController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// router.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('user'),reviewController.createReview)


// 

module.exports=router