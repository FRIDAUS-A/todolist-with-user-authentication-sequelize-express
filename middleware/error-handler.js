const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instance of CustomAPIError) {
		res.status(err.statusCode).json({message: err.message})
	} else {
		res.status(500).json({message: err.message})
	}
}

module.exports = errorHandlerMiddleware
