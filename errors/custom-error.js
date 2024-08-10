class CustomAPIError extends Error{
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}

const createCustomAPIError = CustomAPIError()


module.exports = {
	createCustomAPIError,
	CustomAPIError
}
