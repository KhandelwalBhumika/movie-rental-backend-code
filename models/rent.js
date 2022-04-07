const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
        required: true
    },
    quantity:{
        type: Number,
        default: 10
    },
    price: {
        type: Number,
        default: 10
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Rent', rentSchema);