// const express = require('express');
const res = require('express/lib/response');
const Movie = require('../models/movie');
const transaction = require('../models/transaction');
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
    updatingBalance,
    softDeleteOneMovie,
    findOneMovie
} = require('../services/movies.service')
const {
    userFindOne,
    saveRentedMovie,
    movieFindOneById,
    findRentedMovie,
} = require('../services/rent.service');
const {newtransaction} = require('../services/transaction.service');

const {userFindOneById, findOneUser} = require('../services/user.services')
const {walletHistory} = require('../services/transaction.service')


module.exports = {


    getOneMovie: async (req, res) => {
        console.log("getOneMovie")
        try {
            const movie = await findByName({
                name: req.params.name
            })
            return res.json(movie)
        } catch (err) {
            res.json({
                status: "error",
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
                status: 'success',
                data: movie
            })
        } catch (err) {
            res.json({
                status: "error",
                message: err.message
            })
        }
    },

    addMovie: async (req, res) => {
        console.log('addMovie')
        try {
            const movie = {
                name: req.body.name,
                releaseDate: req.body.releaseDate,
                genre: req.body.genre,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity
            }
            const newMovie = await addNewMovie(movie)
            console.log('newMovie', newMovie)

            return res.json({
                status: "success",
                data: "Movie saved"})
        } catch (err) {
            console.log(err.message);
            res.json({
                status: "error",
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
                status: "error",
                message: err.message
            })
        }
    },

    deleteMovie: async (req, res) => {
        console.log('deleteMovie')
        try {
            const id = req.params.id
            const movieAvailable = await 
            findOneMovie(
                {id},
                {isDeleted: false}
            )
            console.log('movieAvailable', movieAvailable)
            if (movieAvailable) {
                    await softDeleteOneMovie(
                    {_id: id}, 
                    {
                            isDeleted: true
                    }
                //    {isDeleted: true}
                )
                return res.json({
                    status: "success",
                    message: "Movie successfully deleted!"
                })
            };
            return res.status(404).json({
                message: "movie not found"
            })
        } catch (err) {
            res.json({
                status: "error",
                message: err.message
            })
        }
    },

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
            console.log('payload', payload)
            console.log(typeof(payload.quantity))

            const updatedQuantity = checkMovieObj.quantity - req.body.quantity
            const updatedBalance = pickUser.balance - (req.body.quantity * checkMovieObj.price) 

            editingMovie(movieId, {
                $set: {
                    quantity: updatedQuantity
                }
            })
            userbalance = updatingBalance(req.user._id, {
                $set: {
                    balance: updatedBalance
                }
            })
            const saved = await saveRentedMovie(payload)

             // add history
             if(saved !== null){
                newtransaction({
                    userId: req.user._id, 
                    balance: updatedBalance,
                    rentId: saved._id,
                    transactionType: "debit- movie rented"
                })
               
               console.log(saved)

            return res.json({
                status: 'success',
                message: 'Movie rented successfully!'
            })
        }
        } catch (err) {
            console.log(err);
            return res.json({
                status: "error",
                message: err.message
            })
        }
    },

    userRentedList: async (req, res, next) => {
        console.log('userRentedList')
        try {
            const {
                limit,
                skip,
                sort
            } = req.query


            console.log('req.user._id', req.user._id, req.user.role)
            const query = {}
            if(req.user.role == "user"){
                query.userId = req.user._id
                // query.returnStatus = false
            }

            const rentedMovieList = await findRentedMovie(query)
            return res.json({
                status: "success",
                data: rentedMovieList
            })
        
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            })
        }
    },

    userWalletHistory: async(req, res, next) => {
        console.log('userWalletHistory')
        try{
            const {
                limit,
                skip,
                sort
            } = req.query
            const userWalletHistory = await walletHistory({ userId: req.user._id})
            // console.log('userWalletHistory', userWalletHistory)
            return res.json({
                status: "success",
                data: userWalletHistory
            })
        } catch (err) {
            return res.json({
                status: "error",
                message: err.message
            })
        }
    }
}

walletHistory




