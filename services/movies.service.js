const Movie = require('../models/movie');
const User = require('../models/user');

module.exports.findByName = async (name) => {
    return await Movie.findOne(name)
}

module.exports.findAllMovies = async (query) => {
    return await Movie.find(query)
}

module.exports.findMovie = async (query = {}, projection = '', sort = 'name', limit = 1000, skip = 0) => await Movie.find(query, projection).sort(sort).skip(skip).limit(limit)

module.exports.addNewMovie = async (movie) => {
    return await Movie.create(movie)
}

module.exports.editingMovie = async (id, body, option) => {
    return await Movie.findByIdAndUpdate(id, body, option)
}

module.exports.updatingBalance = async (id, body, option) => {
    return await User.findByIdAndUpdate(id, body, option)
}

module.exports.findMovieById = async (id) => {
    return await Movie.findById(id)
}

module.exports.deleteOneMovie = async (id) => {
    return await Movie.deleteOne(id)
}