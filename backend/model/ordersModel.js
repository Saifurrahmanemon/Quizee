const mongoose = require('mongoose');

const ordersScheme = mongoose.Schema(
	{
		email: String,
		quizId: String,
		quizName: String,
		retakes: Number,
		status: String,
		paid: Boolean,
		transactionId: String,
		price: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Order', ordersScheme);
