const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');

const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const {router} = require('./routes');
const swaggerSpec = require('./utils/swagger');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Initialise passport strategies
require('./utils/passport');

// Connect to database
require('./datasources');

//Initialise Express App
const app = express();

//Swagger UI Initialisation
const options = {
  // explorer: true,
  customCss: `
    .swagger-ui .info {
      margin: 6px 0px 
    }

    .swagger-ui .scheme-container {
      margin: 0px;
      padding: 20px 0px
    }
  `
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Logger
logger.basicLogger(app);

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Request to ping the application server
app.get('/ping',  function(req, res, next) {
  res.send('pong');
})

//Router
app.use('/api', router);

// catch 404 for routes which are not found and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

//Basic Error Handler
errorHandler.basicErrorHandler(app);

module.exports = app;