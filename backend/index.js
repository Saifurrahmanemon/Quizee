const express = require('express');
const cors = require('cors');
const dbConnect = require('./utils/dbconnect');
require('dotenv').config();
const quizzesRoutes = require('./routes/v1/quizzes.route');
const usersRoutes = require('./routes/v1/users.route');
const adminsRoutes = require('./routes/v1/admins.route');
const ordersRoutes = require('./routes/v1/orders.route');
const paymentRoutes = require('./routes/v1/payment.route');

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

dbConnect();

app.use('/api/v1/quizzes', quizzesRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/admins', adminsRoutes);
app.use('/api/v1/create-payment-intent', paymentRoutes);

// run server
app.get('/', (req, res) => {
  res.send('hello world');
});

app.all('*', (req, res) => {
  res.send('No Routes Found');
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
