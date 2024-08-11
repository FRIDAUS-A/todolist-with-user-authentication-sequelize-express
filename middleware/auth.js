const { UnauthenticatedError } = require("../errors")
jwt = require('jsonwebtoken')
Customer = require('../models/customer.model')


const authenticationMiddleWare = async (req, res, next) => {
	
	const authHeader = req.headers.authorization
	console.log(authHeader)
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError("NO TOKEN PROVIDED")
	}
	token = authHeader.split(' ')[1]
	try {
		decoded = jwt.verify(token, process.env.JWT_KEY)
		const { customer_id } = decoded
		req.customer = { customer_id }
	} catch (err) {
		throw new UnauthenticatedError('TOKEN IS INVALID')
	}
	next()
}


module.exports = { authenticationMiddleWare }