const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbConnect = require('./utils/dbconnect');
require('dotenv').config();
const quizesRoutes = require('./routes/v1/quizes.route');

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

dbConnect();

app.use('/api/v1/quizes', quizesRoutes);

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
