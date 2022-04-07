module.exports.getUser = async (req, res, next) => {
    console.log('getUser');
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.json({
                message: 'Please enter valid user.'
            })
        }
        return res.send(user)
    } catch (err) {
        return res.json(err)
    }
    req.user = user
    next()
}