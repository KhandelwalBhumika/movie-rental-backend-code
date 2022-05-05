require('dotenv').config()

const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.authenticateToken = async (req, res, next) => {
    console.log('authenticateToken');
    const token =
        req.headers["Authorization"] ||
        req.headers["authorization"] ||
        req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Token is required"});
    }
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        // req._id = decoded.user._id
        // req.role = decoded.user.role
        req.user = decoded.user
        console.log(decoded);
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            status: "error",
            message: "Unauthorized token"});
    }
}