// const express = require('express');
const res = require('express/lib/response');
const Movie = require('../models/movie');
const {
    findOne
} = require('../models/user');
const User = require('../models/user');
const {
    findByName,
    findAllMovies,
    addNewMovie,
    editingMovie,
    deleteOneMovie,
    findMovieById,
    findMovie,
    updatingBalance
} = require('../services/movies.service')
const {
    userFindOne,
    saveRentedMovie,
    movieFindOneById,
    findRentedMovie
} = require('../services/rent.service');

const {userFindOneById} = require('../services/user.services')


module.exports = {


    getOneMovie: async (req, res) => {
        //console.log("getOneMovie")
        try {
            const movie = await findByName({
                name: req.params.name
            })
            return res.json(movie)
        } catch (err) {
            res.json({
                status: "Error",
                message: err.message
            })
        }

    },

    getAllMovies: async (req, res) => {
        console.log('getAllMovies')
        try {
            const {
                genre,
                limit,
                skip,
                sort
            } = req.query

            const dbQuery = {}

            if (genre) {
                dbQuery.genre = genre
            }
            const movie = await findMovie(dbQuery, '', sort, limit, skip)
            return res.json({
                status: 'Success',
                data: movie
            })
        } catch (err) {
            res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    addMovie: async (req, res) => {
        console.log('addMovie', req.body)
        try {
            const movie = {
                name: req.body.name,
                releaseDate: req.body.releaseDate,
                genre: req.body.genre,
                description: req.body.description,
                // image: req.file.path,
                price: req.body.price,
                quantity: req.body.quantity
            }
            console.log('hi', movie)
            const newMovie = await addNewMovie(movie)
            return res.json({
                status: "Success",
                data: "Movie saved"})
            // return res.send("ok")
        } catch (err) {
            console.log(err.message);
            res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    editMovie: async (req, res) => {
        console.log('editMovie')
        try {
            const _id = req.params.id
            const movie = {
                name: req.body.name,
                releaseDate: req.body.releaseDate,
                genre: req.body.genre,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price
            }
            const updateMovie = await editingMovie(_id, movie, {
                new: true
            })
            console.log(updateMovie)
            return res.json(
                {
                status: "success",
                // message: "movie updated",
                data: updateMovie
            })
        } catch (err) {
            res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    deleteMovie: async (req, res) => {
        console.log('deleteMovie')
        try {
            id = req.params.id
            console.log(id)
            movieAvailable = await findMovieById(id)

            if (movieAvailable) {
                const movie = await deleteOneMovie({
                    _id: id
                })
                return res.json({
                    status: "success"
                    // message: movie 
                    // message: "Movie successfully deleted!"
                })
            };
            return res.status(404).json({
                message: "movie not found"
            })
        } catch (err) {
            res.json({
                status: "Error",
                message: err.message
            })
        }
    },

    // filterByGenre: async (req, res) => {
    //     console.log('filterByGenre')
    //     const match = {}

    //     if (req.query.genre) {
    //         match.genre = req.query.genre === 'true'
    //     }
    //     try {
    //         console.log('aaaaaaaaaaaaaaa')
    //         await req.Movie.populate({
    //             path: 'posts',
    //             match
    //         }).execPopulate()
    //         res.send(req.user.Movie)
    //     } catch (err) {
    //         console.log(err.message);
    //         return res.json({
    //             message: err.message
    //         })
    //     }

    // },
    // filterByReleaseDate: async (req, res) => {
    //     const match = {}

    //     if (req.query.releaseDate) {
    //         match.releaseDate = req.query.releaseDate === 'true'
    //     }
    //     try {
    //         await req.Movie.populate({
    //             path: 'posts',
    //             match
    //         }).execPopulate()
    //         res.send(req.user.Movie)
    //     } catch (err) {
    //         return res.json({
    //             message: err.message
    //         })
    //     }
    // },


    rentMovie: async (req, res) => {
        console.log('rentMovie')
        try {
            const movieId = req.body.movieId;
            req.body.userId = req.user._id;

            const checkMovieObj = await movieFindOneById(movieId)
            const pickUser = await userFindOneById(req.user._id)

            console.log('pickUser', pickUser, 'req.user._id', req.user._id, 'checkMovieObj', checkMovieObj)

            if (!checkMovieObj) {
            return res.json({ 
                status: "error", 
                message:'The movie does not exist in the database.'
            })
            }

            if (checkMovieObj.quantity < req.body.quantity) {
                return res.json({
                    status: 'error',
                    message: 'Insufficient quantity!'
                })
            }  
            if(pickUser.balance < req.body.quantity * checkMovieObj.price){
                return res.json({
                    status: "error",
                    message: "Insufficient balance!"
                })
            }
            const payload = {
                userId: req.user._id,
                // userId : user_Id,
                movieId: checkMovieObj._id,
                quantity: req.body.quantity,
                price: checkMovieObj.price || 0
            }
            console.log(payload)
            console.log(typeof(payload.quantity))

            const updatedQuantity = checkMovieObj.quantity - req.body.quantity
            const updatedBalance = pickUser.balance - (req.body.quantity * checkMovieObj.price) 

            editingMovie(movieId, {
                $set: {
                    quantity: updatedQuantity
                }
            })
            updatingBalance(req.user._id, {
                $set: {
                    balance: updatedBalance
                }
            })

            const saved = await saveRentedMovie(payload)
            return res.json({
                status: 'success',
                message: 'Movie rented successfully!'
            })
        } catch (err) {
            console.log(err);
            return res.json({
                status: "error",
                message: err.message
            })
        }
    },

    userRentedList: async (req, res, next) => {
        try {
            const {
                limit,
                skip,
                sort
            } = req.query
            
            const rentedMovieList = await findRentedMovie()
            return res.json({
                status: "Success",
                data: rentedMovieList
            })
        } catch (err) {
            return res.json({
                status: "Error",
                message: err.message
            })
        }
    }
}