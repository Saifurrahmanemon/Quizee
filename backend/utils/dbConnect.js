const { MongoClient, ServerApiVersion } = require('mongodb');

function dbConnect() {
   //  const uri = process.env.MONGO_URI;
   //  const client = new MongoClient(uri, {
   //     useNewUrlParser: true,
   //     useUnifiedTopology: true,
   //     serverApi: ServerApiVersion.v1,
   //  });
   console.log('MongoDB connected');
}

module.exports = dbConnect;
