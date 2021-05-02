const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const _ = require('lodash');

const User = require('../models/User');

/**
 * Registers an User
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
*/
const registerUser = async(req, res, next) => {
  try{
      const {email, password, phone} = _.get(req, 'body');

      const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS) || 10;
      const hashedPwd = await bcrypt.hash(password, saltRounds);
      
      let insertObj = {
          email: email,
          password: hashedPwd,
          phone: phone
      };

      let userDoc = await User.create(insertObj);
      if(userDoc){
        return res.status(200).json({
            message : 'Registered Successfully',
            success: true,
        });
      }
      else{
        return next(createError(400, 'Registration Failed'));
      }
  }
  catch(err){
      next(err);
  }
}

/**
 * Logs In an User
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
 * @returns Bearer token
*/
const loginUser = (req, res, next) => {
  try{
      if(!_.get(req, "token")){
          let error = createError(500, 'Token Creation Failed')
          return next(error)
      }

      return res.status(200).json({
          message : 'Token Created Successfully',
          success: true, 
          token : req['token'], 
          userId : req['user'].userId
      });
      
  }
  catch(err){
      next(err);
  }
}

/**
 * Logs out an User
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
*/
const logoutUser = async(req, res, next) => {
  try{
      //TODO: Invalidate Redis Session Token
      await req.logout();

      return res.status(200).json({
        message : 'Logged out Successfully',
        success: true,
    });
  }
  catch(err){
      next(err);
  }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}
