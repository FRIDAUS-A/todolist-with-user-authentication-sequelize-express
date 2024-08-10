const express = require('express')
const router = express.Router()

const { createCustomer,resendOtp, verifyEmail,updateCustomer,loginCustomer } = require('../controllers/customer.controller')


router.route('/').post(createCustomer)
router.route('/:id').patch(updateCustomer)
router.route('/verify-email').get(verifyEmail)
router.route('/resend-otp').get(resendOtp)
router.route('/login').post(loginCustomer)




module.exports = router