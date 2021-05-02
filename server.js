const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const createError = require('http-errors');

const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
require('./datasources');

//Initialise Express App
const app = express();

// Logger
logger.basicLogger(app);

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Request to ping the application server
app.get('/ping',  function(req, res, next) {
  res.send('pong');
})

// catch 404 for routes which are not found and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

//Basic Error Handler
errorHandler.basicErrorHandler(app);

module.exports = app;