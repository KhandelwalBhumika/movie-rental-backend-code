module.exports.checkIfAdmin = async (req, res, next) => {
    console.log("checkIfAdmin ")
    try {
        if (req.user.role == 'admin') {
            return next()

        } else {
            return res.send({
                message: 'You are not an admin!'
            })
        }
    } catch (err) {
        res.send({
            message: err.message
        })
    }
}