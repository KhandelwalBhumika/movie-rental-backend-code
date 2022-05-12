const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    quantity:{
        type: Number,
        default: 10
    },
    price: {
        type: Number,
        default: 10
    },
    returnStatus: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Rent', rentSchema);