const joi = require('joi')
const Regexp = require('./regexString.json')
joi.objectID = require('joi-objectid')(joi)

module.exports = {
    //SignUp
	signupValidation: joi.object({
        firstName: joi.string().trim().pattern(new RegExp(Regexp.name)).required(),
		lastName: joi.string().trim().pattern(new RegExp(Regexp.lastname)).required(),
		email: joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": `email must contain value`,
            "string.base": `email should be a type of string`,
            "string.pattern.base": `Please check the format!`,
            "any.required": `contactNumber is a required field`
        }),
		password: joi.string().trim().required(),
        confirmPassword: joi.string().trim().required(),
        contactNumber: joi.string().trim().pattern(new RegExp(Regexp.indianMobileNumber)).required().messages({
            "string.base": `contactNumber should be a type of string`,
            "string.empty": `contactNumber must contain value`,
            "string.pattern.base": `contactNumber must be 10 digit number starting from number between 9-6.`,
            "any.required": `contactNumber is a required field`
        }),
        role: joi.string().trim().required()
	}),
    //LogIn
    loginValidation: joi.object({
        email: joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": `email must contain value`,
            "string.base": `email should be a type of string`,
            "string.pattern.base": `Please check the format!`,
            "any.required": `contactNumber is a required field`
        }),
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
		price: joi.number().min(1).required().messages({
            "number.pattern.base": `Please check the format!`,
            "any.required": `price is a required field`
        })
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
        firstName: joi.string().trim().pattern(new RegExp(Regexp.name)),
		lastName: joi.string().trim().pattern(new RegExp(Regexp.name)),
		// email: joi.string().email(),
		password: joi.string().trim(),
        contactNumber: joi.string().trim().pattern(new RegExp(Regexp.indianMobileNumber)).messages({
            "string.base": `contactNumber should be a type of string`,
            "string.pattern.base": `contactNumber must be 10 digit number starting from number between 9-6.`,
            }),
		balance: joi.number(),
        // finalBalance: joi.number()
    })
}
    