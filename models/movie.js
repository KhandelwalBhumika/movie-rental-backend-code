const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    releaseDate: {
        type: String
    },
    genre: {
        type: Array
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    image : {
        type : String
    }
} )

module.exports = mongoose.model('Movie', movieSchema)