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

module.exports.userFindOneById = async (id) => {
    return await User.findById(id)
}

module.exports.updateUser = async(id,query) => { 
    userUpdated = await User.findByIdAndUpdate({_id:id}, query,{new:true})
    return userUpdated
}
module.exports.removingUser = async (query) => {
    return await res.user.remove(query)
}

module.exports.findOneUserBalance = async (id, query) => {
    return await User.findOne(id, query)
}

module.exports.updateBalance = async (id, query) => {
    return await User.findByIdAndUpdate({_id:id}, query, {new:true})
}
