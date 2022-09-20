const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const paymentController = require('../../controllers/payment.controller');

router
	.route('/')
	/**
	 * @desc post stripe payment
	 * @route post api/v1/admins
	 * @access private user
	 */
	.post(paymentController.stripePay);

module.exports = router;
