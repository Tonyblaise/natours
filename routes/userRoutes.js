
const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')





// app.post('/api/v1/tours', createNewTour)
// app.patch('/api/v1/tours/:id',updateTour )
// app.delete('/api/v1/tours/:id', deleteTour)
// app.get('/api/v1/tours/:id/', getAllTours)
// app.get('/api/v1/tours/:id/', getTour)

//Routes

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)





router.route('/').get(userController.getAllUsers).post(userController.createUser)
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports= router