require('dotenv').config()

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controller/usersHandleFunction');
const { authenticateToken } = require('../middleware/authenticateToken')
const { checkIfAdmin } = require('../middleware/checkIfAdmin')
// const moviesController = require('../controller/moviesHandleFunction');
const joiValidation = require('../middleware/joiValidation');
const joiValidationSchema = require('../utils/validation');

// const user = require('../models/user');



//Getting all --> working
router.get('/', authenticateToken, checkIfAdmin, userController.gettingAllUser)

//Getting One --> working
router.get('/:id', authenticateToken, checkIfAdmin, userController.gettingOneUser)

//Creating User/signUp --> working
router.post('/signUp', joiValidation.joiValidator(joiValidationSchema.signupValidation), userController.creatingSignUp)

//LogIn --> working
router.post('/logIn', joiValidation.joiValidator(joiValidationSchema.loginValidation), userController.creatingLogIn)

//Authenticate User
// router.post('/users-authenticate', userUtils.authenticateToken, userController.authenticateUser)

//Updating One
// router.patch('/:id', userUtils.getUser, userController.updatingUser)

// //Deleting One
// router.delete('/:id', userUtils.getUser, userController.deletingUser)





module.exports = router