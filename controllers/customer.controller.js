const  { Customer }  = require('../models/customer.model')
const {v4: uuidv4} = require('uuid')
const { generateOtp, hashPassword }= require('../utils/index')

const  createCustomerValidation = require('../validation/customer.validation')
const Otp = require('../models/otp.model')
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError } = require('../errors')


const createCustomer = async (req, res) => {
	const {surname, othernames, email, password } = req.body

	customer_id = uuidv4()

	
	// check if there is an error in the validation
	const { error } = createCustomerValidation(req.body)
	

	if (error) throw new Error(error.details[0].message)
	
	// check if email exists 
	//console.log(email)
	const checkIfEmailExist = await Customer.findOne({
		where: {email: email}
	})

	console.log(checkIfEmailExist)
	if(checkIfEmailExist) {
		throw new BadRequestError('A customer with the Email Exists')
	}
	const [hash, salt] = await hashPassword(password)

	
	const customer = await Customer.create({
		customer_id: customer_id,
		surname: surname,
		othernames: othernames,
		email: email,
		hash: hash,
		salt: salt
	})
	customer.save()

	//generate otp
	const otp = generateOtp()

	await Otp.create({
		email: email,
		otp: otp,
		customer_id: customer_id,
		otp_id: uuidv4()
	})
	res.status(201).json({status: 'created successfully', 
		message: 'An OTP has been sent to your email and will expire in 60 seconds'
	})
}

const resendOtp = async (req, res) => {
	const { email } = req.query
	const otp = 
	generateOtp()
	customer = await Customer.findOne({
		where: {
			email: email
		}
	})
	await Otp.create({
		email: email,
		otp: otp,
		otp_id: uuidv4(),
		customer_id: customer.customer_id,
	})


	res.status(201).json({
		status: "success",
		message: 'A new OTP has been sent to you'
	})
}


const verifyEmail = async(req, res) => {
	const { email, otp } = req.query
	
	console.log("where the error is")
	customer = await Customer.findOne({
		where: {
			email:email
		}
	})

	if (customer) {
		const checkIfOtpExist = await Otp.findOne({
			where: {
				customer_id: customer.customer_id,
				otp: otp
			}
		})
		if (!checkIfOtpExist) {
			throw new Error('Invalid Email, Expired OTP or Wrong OTP')
		}
		if(checkIfOtpExist.expired_at < Date.now()) {
			await Otp.destroy({
				where: {
					otp_id: checkIfOtpExist.otp_id
				}
			})
			throw new Error('Invalid Email, Expired OTP or Wrong OTP')
		}
	} else {
		throw new Error('Invalid Email, Expired OTP or Wrong OTP')
	}

	
	await Customer.update({
is_email_verified: true,
}, {
	where: {
		customer_id: customer.customer_id
	}
})

res.status(200).json({
	status: "success",
	message: 'Email verified successfully'
})
}

const loginCustomer = async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError("Provide Email and Password")
	}

	const customer = await Customer.findOne({
		where: {email: email}
	})
	// check if email is verified
	if (!customer.is_verified) {
		throw new BadRequestError("Verify Your Email")
	}
	const storedHash = customer.hash
	checkPassword = await bcrypt.compare(password, storedHash)
	if (!checkPassword) {
		throw new UnauthenticatedError("invalid Detail")
	} 
	const customer_id = customer.customer_id
	token = jwt.sign({customer_id}, process.env.JWT_KEY, {expiresIn: '1d'})

	res.status(StatusCodes.ACCEPTED).json({
		status: "success",
		message: "Login Successful",
		token: token
	})
}
const updateCustomer = async (req, res) => {
	const { customer_id } = req.customer

	let payLoad = req.body
	payLoad.updated_at = Date.now()
	await Customer.update(payLoad, {
		where: {
			customer_id: customer_id
		}
	})
	const customer = await Customer.findOne({
		where: {
			customer_id: customer_id
		}
	})
	return res.status(StatusCodes.CREATED).json({ customer: customer })
}



module.exports = {
	createCustomer,
	resendOtp,
	verifyEmail,
	updateCustomer,
	loginCustomer
}