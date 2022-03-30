/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const colours = require('colours');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('../backend/config/db');
const port = process.env.PORT || 8000;


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));