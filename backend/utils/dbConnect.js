const mongoose = require('mongoose');

const dbConnect = async () => {
	const uri = process.env.MONGO_URI;
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = dbConnect;
