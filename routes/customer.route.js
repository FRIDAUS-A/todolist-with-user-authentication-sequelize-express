const express = require('express')
const router = express.Router()

const { 
	createCustomer,
	resendOtp, 
	verifyEmail,
	updateCustomer,
	loginCustomer 
} = require('../controllers/customer.controller')
const { authenticationMiddleWare } = require('../middleware/auth')

router.route('/').post(createCustomer)
router.route('/').patch(authenticationMiddleWare, updateCustomer)
router.route('/verify-email').get(verifyEmail)
router.route('/resend-otp').get(resendOtp)
router.route('/login').post(loginCustomer)




module.exports = router