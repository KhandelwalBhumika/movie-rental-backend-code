
const User = require('../models/user');

module.exports.findUser = async (query) => {
    return await User.find(query)
}

module.exports.creatingNewUser = async (user) => {
    return await User.create(user)
}

module.exports.findOneUser = async (email) => {
    return await User.findOne(email)
}

module.exports.saveUser = async(query) => {
    return await res.user.save(query)
}
module.exports.removingUser = async (query) => {
    return await res.user.remove(query)
}
