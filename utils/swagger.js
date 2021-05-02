const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Weather API',
        version: '1.0.0',
        description: 'This is a REST API application made with Express For Weather API.'
    },
    servers: [
        {
          url: 'http://localhost:5000',
          description: 'Local Host',
        },
    ],
    securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authentication',
          description: ''
        }
    }
}

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;