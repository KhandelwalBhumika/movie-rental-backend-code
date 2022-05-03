const joi = require('joi')
const Regexp = require('./regexString.json')
joi.objectID = require('joi-objectid')(joi)

module.exports = {
    //SignUp
	signupValidation: joi.object({
        firstName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		lastName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		email: joi.string().email().required(),
		password: joi.string().trim().
        // regex(/[a-zA-Z0-9]{3,30}/).
        required(),
		contactNumber: joi.string().trim().pattern(new RegExp(Regexp.indianMobileNumber)).required(),
        role: joi.string().trim().required()
	}),
    //LogIn
    loginValidation: joi.object({
        email: joi.string().email().required(),
        password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }),
    // Add Movies
    addMovieValidation: joi.object({
        name: joi.string().required(),
		releaseDate: joi.date().
        // regex(/[a-zA-Z0-9]{3,30}/).
        required(),
		genre: joi.string().required(),
		description: joi.string().required(),
		quantity: joi.number().min(1).required(),
		price: joi.number().min(1).required()
    }),
    // admin can edit movies
    editMovieValidation: joi.object({
        name: joi.string(),
		releaseDate: joi.date(),
        // regex(/[a-zA-Z0-9]{3,30}/),
		genre: joi.string(),
		description: joi.string(),
		quantity: joi.number(),
		price: joi.number()
    }),
    //Rent Movie
    rentMovieValidation: joi.object({
        movieId: joi.objectID().required(),
		quantity: joi.number().min(1).required()
    }),
    //Add Money
    // addMoney: joi.object({
    //     // userId: joi.objectID().required(),
    //     balance: joi.number().min(1).required()
    // }),
    
    //Edit Profile
    editProfile: joi.object({
        firstName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		lastName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		email: joi.string().email().required(),
		password: joi.string().trim().
        required(),
		contactNumber: joi.string().trim().pattern(new RegExp(Regexp.indianMobileNumber)).required(),
		balance: joi.number().required()
    })
}
