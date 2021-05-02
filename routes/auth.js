const express = require('express');

const { USER_TYPE } = require("../utils/constants");
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/auth');
const { 
  registerUserSchema,
  loginUserSchema
} = require('../schemas/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router({mergeParams: true});

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
 * definition:
 *   RegisterRequest:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         writeOnly: true 
 *         required: true
 *       phone:
 *         type: string
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Registers an Account for Individual
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
 *       - name: body
 *         in: body
 *         description: Register Individual Body.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registers Account
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
 */

router.post('/register',
  registerUserSchema,
  registerUser
);

/**
 * @swagger
 * definition:
 *   LoginRequest:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         writeOnly: true 
 *         required: true
*/

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login into an Account for Individual
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
 *       - name: body
 *         in: body
 *         description: Login Individual Body.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LoginRequest'
 *     responses:
 *       200:
 *         description: Logs into Account
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
*/

router.post('/login',
  loginUserSchema,
  authMiddleware.authLocal,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  loginUser
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Logout off an Account for Individual
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
 *         description: Logs Out off Account
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
*/

router.post('/logout',
  authMiddleware.authJwt,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  logoutUser
);

module.exports = router;
