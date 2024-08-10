const joi = require('joi')
const { Model } = require('sequelize')


const createCustomerValidation = (data) => {
	const customerSchema = joi.object({
		surname: joi.string().required(),
		othernames: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required()
	})
	return customerSchema.validate(data)
}

module.exports = createCustomerValidation