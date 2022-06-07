
const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const reviewController = require('./../controllers/authController')








// app.post('/api/v1/tours', createNewTour)
// app.patch('/api/v1/tours/:id',updateTour )
// app.delete('/api/v1/tours/:id', deleteTour)
// app.get('/api/v1/tours/:id/', getAllTours)
// app.get('/api/v1/tours/:id/', getTour)

//Routes

const router = express.Router()


router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

//protect all routes after this middleware
router.use(authController.protect)
router.patch('/updateMyPassword',  authController.updatePassword)
router.patch('/updateUser',  userController.updateUser)

router.delete('/deleteMe', userController.deleteMe)




router.get('/me', userController.getMe, userController.getUser)

router.use(authController.restrictTo('admin'))

router.route('/').get(userController.getAllUsers)
router.route('/:id').get(userController.getUser).patch(userController.updateUser)




module.exports = router

