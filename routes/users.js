require('dotenv').config()

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controller/usersHandleFunction');
const { authenticateToken } = require('../middleware/authenticateToken')
const { checkIfAdmin } = require('../middleware/checkIfAdmin')
// const {getUser} = require('../middleware/getUser');
// const moviesController = require('../controller/moviesHandleFunction');
const joiValidation = require('../middleware/joiValidation');
const joiValidationSchema = require('../utils/validation');




//Getting all --> working
router.get('/', authenticateToken, checkIfAdmin, userController.gettingAllUser)

//Getting One --> working
router.get('/details', authenticateToken, userController.gettingOneUser)


//Getting One --> working
// router.get('/details', authenticateToken, checkIfAdmin, userController.gettingOneUser)

//Creating User/signUp --> working
router.post('/signUp', joiValidation.joiValidator(joiValidationSchema.signupValidation), userController.creatingSignUp)

//LogIn --> working
router.post('/logIn', joiValidation.joiValidator(joiValidationSchema.loginValidation), userController.creatingLogIn)

//Google Login
router.post('/google', userController.googleLogin)

//Updating One and managing wallet
router.put('/manage/updateWallet', authenticateToken, 
joiValidation.joiValidator(joiValidationSchema.editProfile), userController.updatingUser)


//return movie
// router.get

// //Deleting One
// router.delete('/:id', userUtils.getUser, userController.deletingUser)





module.exports = router