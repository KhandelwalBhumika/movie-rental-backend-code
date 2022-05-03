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

module.exports.updateUser = async(id,query) => { 
    // console.log("inside service", query)
    // console.log("id insid service .......................",id)
    // User.findByIdandUpdate(id,query)
    // console.log("this is the one", await User.findById({_id:"624d47731016729b748cb134"}))
    // console.log("updeted user:",userUpdated )
    userUpdated = await User.findByIdAndUpdate({_id:id}, query,{new:true})
    return userUpdated
}
module.exports.removingUser = async (query) => {
    return await res.user.remove(query)
}

module.exports.findOneUserBalance = async (id, query) => {
    return await User.findOne(id, query)
}
