const express = require('express');
const ordersController = require('../../controllers/orders.controller');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

router
	.route('/:email/:id')
	/**
	 * @desc get quiz info for individual user
	 * @route PUT api/v1/admins
	 * @access private user
	 */
	.get(verifyJWT, ordersController.getAOrder)
	/**
	 * @desc check if user is a admin
	 * @route get api/v1/admins
	 * @access private
	 */
	.put(ordersController.putAOrder);

module.exports = router;
