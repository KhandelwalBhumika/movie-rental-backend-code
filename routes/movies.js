const express = require('express');
const moviesrouter = express.Router();
const Movie = require('../models/movie');
const moviesController = require('../controller/moviesHandleFunction');
const match = require('nodemon/lib/monitor/match');
const {
    authenticateToken
} = require('../middleware/authenticateToken');
const multer = require("../middleware/multer");
// const moviesHandleFunction = require('../controller/moviesHandleFunction');
const {
    checkIfAdmin
} = require('../middleware/checkIfAdmin');
const joiValidation = require('../middleware/joiValidation');
const joiValidationSchema = require('../utils/validation');




//User can see one movie --->working 
moviesrouter.get('/:name', moviesController.getOneMovie)


//user can see all movies available --> working
moviesrouter.get('/', moviesController.getAllMovies)

//Add Movies---> working
moviesrouter.post('/admin/create', multer.single('image'), authenticateToken, checkIfAdmin, joiValidation.joiValidator(joiValidationSchema.addMovieValidation), moviesController.addMovie)

//admin can edit movies ---> working
moviesrouter.put('/:id', authenticateToken, checkIfAdmin, joiValidation.joiValidator(joiValidationSchema.editMovieValidation), moviesController.editMovie)

//admin can delete  movies ---> working
moviesrouter.delete('/:id', authenticateToken, checkIfAdmin, moviesController.deleteMovie)

//user can filter movies by genre, 
//moviesrouter.get('/filter/:genre', moviesController.filterByGenre)

//user can sort movies by release date
//moviesrouter.get('/:releaseDate', moviesController.filterByReleaseDate)

//Rent Movie
moviesrouter.post('/rent-movie', authenticateToken, joiValidation.joiValidator(joiValidationSchema.rentMovieValidation), moviesController.rentMovie)

//admin can see which user rented which movie with movie details
moviesrouter.get('/rent-movie/list', authenticateToken, checkIfAdmin, moviesController.userRentedList)

module.exports = moviesrouter