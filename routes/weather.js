const express = require('express');

const { USER_TYPE } = require("../utils/constants");
const {
  compare,
  update,
} = require('../controllers/weather');

const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * definition:
 *   SuccessResponse:
 *     properties:
 *       success:
 *         type: boolean
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /api/weather/update:
 *   post:
 *     tags:
 *       - Weather
 *     description: Updates the weather data in the database
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authentication
 *         in: header
 *         description: Authentication
 *         default: 'Bearer '
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: Updated the weather data
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
 */

router.post('/update',
  authMiddleware.authJwt,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  update
);

/**
 * @swagger
 * /api/weather/compare:
 *   get:
 *     tags:
 *       - Weather
 *     description: Fetches the two cities that have a similiar forcast
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authentication
 *         in: header
 *         description: Authentication
 *         default: 'Bearer '
 *         required: true
 *         type: apiKey
 *     responses:
 *       200:
 *         description: Fetched the cities with similiar forecast
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
 */

 router.get('/compare',
  authMiddleware.authJwt,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  compare
);

module.exports = router;
