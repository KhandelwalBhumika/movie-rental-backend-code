const Rent = require('../models/rent');
const Movie = require('../models/movie');
const User = require('../models/user');
const Transaction = require('../models/transaction');

module.exports.newtransaction = async(newTransaction={}) => await Transaction.create(newTransaction)

module.exports.walletHistory = async (query={}, projection='', sort='-createdAt', limit=50, skip=0) => await Transaction.find(query, projection).sort(sort).skip(skip).limit(limit).
// populate(['userId','movieId'])
populate({
    path: 'userId',
    model: 'User'
}).
populate({
    path: 'rentId',
    model: 'Rent',
    populate: {
        path: 'movieId',
        model: 'Movie'
    }
})