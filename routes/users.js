const express = require('express');

const { USER_TYPE } = require("../utils/constants");
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  updateUserSchema
} = require('../schemas/user');

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
 * definition:
 *   GetUserResponse:
 *     properties:
 *       _id:
 *         type: string
 *       isEmailConfirmed:
 *         type: boolean
 *       isPhoneConfirmed:
 *         type: boolean
 *       email:
 *         type: string
 *       phone:
 *         type: string
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - User
 *     description: Fetches an Account details for Individual
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
 *         description: Fetches Account Details
 *         schema: 
 *           $ref: '#/definitions/GetUserResponse'
 *     security:
 *       - JWT: []
 */

router.get('/me',
  authMiddleware.authJwt,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  getUser
);

/**
 * @swagger
 * definition:
 *   EditUserRequest:
 *     properties:
 *       email:
 *         type: string
 *       phone:
 *         type: string
 */

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags:
 *       - User
 *     description: Updates an Account details for Individual
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
 *         description: User Body.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/EditUserRequest'
 *     responses:
 *       200:
 *         description: Updates Account Details
 *         schema: 
 *           $ref: '#/definitions/SuccessResponse'
 *     security:
 *       - JWT: []
 */

 router.patch('/me',
  updateUserSchema,
  authMiddleware.authJwt,
  authMiddleware.authorize(USER_TYPE.USER, USER_TYPE.ADMIN),
  updateUser
);

module.exports = router;
