/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports.stripePay = asyncHandler(async (req, res) => {
	const { price } = req.body;
	const amount = price * 100;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: 'usd',
		payment_method_types: ['card'],
	});

	console.log(paymentIntent);

	res.send({ clientSecret: paymentIntent.client_secret });
});
