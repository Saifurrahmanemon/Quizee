const express = require('express');
const ordersController = require('../../controllers/orders.controller');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

router
	.route('/:email/:id')
	/**
	 * @desc get quiz info for individual user
	 * @route PUT api/v1/orders
	 * @access private user
	 */
	.get(verifyJWT, ordersController.getAOrder)
	/**
	 * @desc create or update single quiz info based on user email
	 * @route get api/v1/orders
	 * @access private user
	 */
	.put(verifyJWT, ordersController.putAOrder)
	/**
	 * @desc update status of quiz and insert transaction id
	 * @route patch api/v1/orders
	 * @access private user
	 */
	.patch(verifyJWT, ordersController.updateAOrder);

router.get('/:email', ordersController.getUserOrders);

module.exports = router;
