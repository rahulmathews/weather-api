const _ = require('lodash');

const User = require('../models/User');


/**
 * Gets a user doc using token.
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
 */
const getUser = async(req, res, next) => {
  try{
      const userId = _.get(req.user , 'userId');

      if(_.isNil(userId)){
        let error = createError(400, 'User Id is either null or undefined');
        throw error;
      };

      let userDoc = await User.findOne({_id: userId}).lean();

      if(userDoc){
          return res.status(200).json({
            message : 'Success',
            success: true,
            data : userDoc
        });
      }
      else{
          return res.status(204).json({
            message : 'Data Not Found',
            success: false,
        });
      }
      
  }
  catch(err){
      next(err);
  }
}

/**
 * Updates the User Doc
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
*/
const updateUser = async(req, res, next) => {
  try{
    const {email, phone} = _.get(req, 'body');
    const userId = _.get(req.user , 'userId');

    if(_.isNil(userId)){
        let error = createError(400, 'User Id is either null or undefined');
        throw error;
    };
      
    let updateObj = {
        email: email,
        phone: phone
    };

    await User.updateOne({_id: userId}, {
        $set: updateObj
    }, {omitUndefined: true})

    return res.status(200).json({
        message : 'Success',
        success: true
    });
    
  }
  catch(err){
    next(err);
  }
}

module.exports = {
    getUser,
    updateUser
}
