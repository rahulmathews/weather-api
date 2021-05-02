const _ = require('lodash');

const Weather = require('../models/Weather');
const WeatherService = require('../services/weather');


/**
 * Updates the latest forecast data to database.
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
 */
const update = async(req, res, next) => {
  try{
      
      let data = await WeatherService.getForecast(next);

      let promArr = [];

      data.forEach((Obj) => {
        let filter = {
          latitude: Obj.data.lat,
          longitude: Obj.data.lon
        };

        let current = Obj.data.current;

        let prom = Weather.updateOne(filter, {
          $push: {
            current: current
          }
        }, {upsert: true});

        promArr.push(prom);
      })

      let result = await Promise.all(promArr);

      if(result){
          return res.status(200).json({
            message : 'Successfully Updated',
            success: true
        });
      }
      else{
          return res.status(204).json({
            message : 'Data not Updated',
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
const compare = async(req, res, next) => {
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
    update,
    compare
}
