module.exports.joiValidationOption = {
    allowUnknown: true
}

module.exports.joiValidationProperty = {
    reqBody: 'body',
    reqParams: 'params',
    reqQuery: 'query'
}

module.exports.joiValidator = (Schema, property = this.joiValidationProperty.reqBody, options = {
    allowUnknown: false
}) => {
    return (req, res, next) => {
        const {
            error
        } = Schema.validate(req[property], options)
        if (!error) return next()
        error.message = error.details.map(i => i.message).join(',')
        error.code = 400

        console.log('message', error.message)
        return res.status(error.code).json({
            status: 'Failure',
            message: error.message
        })
    }
}