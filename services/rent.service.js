const Rent = require('../models/rent');
const Movie = require('../models/movie')

exports.userFindOne = async (condition) => {return await Rent.findOne(condition)}

exports.findUsers = async (query) => {
    await Rent.find(query)}

exports.saveRentedMovie = async (rentData) => {     
    return await Rent.create(rentData)
}

exports.movieFindOneById = async _id => await Movie.findById(_id)

module.exports.findRentedMovie = async (query={}, projection='', sort='name', limit=1000, skip=0) => await Rent.find(query, projection).sort(sort).skip(skip).limit(limit).populate('userId').populate('movieId')
