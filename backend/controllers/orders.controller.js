const asyncHandler = require('express-async-handler');
const Orders = require('../model/ordersModel.js');

module.exports.getAOrder = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const id = req.params.id;
	const filter = { email: email, quizId: id };
	const result = await Orders.findOne(filter);
	res.send(result);
});

module.exports.getUserOrders = asyncHandler(async (req, res) => {
	const email = req.params.email;
	const filter = { email: email, paid: true };
	const result = await Orders.find(filter);
	res.send(result);
});

module.exports.putAOrder = asyncHandler(async (req, res) => {
	const order = req.body;
	const email = req.params.email;
	const id = req.params.id;
	const filter = { email: email, quizId: id };
	const options = { upsert: true, new: true };
	const update = {
		$set: order,
	};
	// Find the document
	const result = await Orders.findOneAndUpdate(filter, update, options);

	res.send({ result });
});
/**
 * might create separate collection for payment in future thats why receiving
 * payment { email,price, transactionId}
 */
module.exports.updateAOrder = asyncHandler(async (req, res) => {
	const payment = req.body;
	const email = req.params.email;
	const id = req.params.id;
	const filter = { email: email, quizId: id };
	const options = { upsert: true, new: true };
	// Find the document
	const result = await Orders.findOneAndUpdate(filter, payment, options);
	res.send({ result });
});

module.exports.getPaidOrders = asyncHandler(async (req, res) => {
	const filter = { paid: true };
	const result = await Orders.find(filter);
	res.send(result);
});

module.exports.getPaidUsers = asyncHandler(async (req, res) => {
	const filter = { paid: true };
	const result = await Orders.find(filter).distinct('email');
	res.send(result);
});
