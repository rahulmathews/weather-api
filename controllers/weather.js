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
 * Compares the latest forecast and sends the similiar pattern 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next callback
*/
const compare = async(req, res, next) => {
  try{
    
    let data = await Weather.find({}).lean();

    let combinationPairs = [];

    data.forEach((Obj, index) => {
      let nextData = data.slice(index + 1);

      nextData.forEach((innerObj) => {
        let dataObj = {
          sourceLat: Obj.latitude,
          sourceLong: Obj.longitude,
          destLat: innerObj.latitude,
          destLong: innerObj.longitude,
        };

        dataObj.changeInTemp = (
          (
            Obj.current[Obj.current.length - 1].temp - 
            innerObj.current[innerObj.current.length - 1].temp
          ) / 
          Obj.current[Obj.current.length - 1].temp
          ) * 100;

        dataObj.changeInFeelsLike = (
          (
            Obj.current[Obj.current.length - 1].feels_like - 
            innerObj.current[innerObj.current.length - 1].feels_like
          ) / 
          Obj.current[Obj.current.length - 1].feels_like
          ) * 100;

        dataObj.changeInPressure = (
          (
            Obj.current[Obj.current.length - 1].pressure - 
            innerObj.current[innerObj.current.length - 1].pressure
          ) / 
          Obj.current[Obj.current.length - 1].pressure
          ) * 100;

        dataObj.changeInHumidity = (
          (
            Obj.current[Obj.current.length - 1].humidity - 
            innerObj.current[innerObj.current.length - 1].humidity
          ) / 
          Obj.current[Obj.current.length - 1].humidity
          ) * 100;

        dataObj.changeInDewPoint = (
          (
            Obj.current[Obj.current.length - 1].dew_point - 
            innerObj.current[innerObj.current.length - 1].dew_point
          ) / 
          Obj.current[Obj.current.length - 1].dew_point
          ) * 100;

        dataObj.changeInWindSpeed = (
          (
            Obj.current[Obj.current.length - 1].wind_speed - 
            innerObj.current[innerObj.current.length - 1].wind_speed
          ) / 
          Obj.current[Obj.current.length - 1].wind_speed
          ) * 100;

        dataObj.resultantChange = Math.abs(dataObj.changeInTemp) + Math.abs(dataObj.changeInFeelsLike) + Math.abs(dataObj.changeInPressure) + Math.abs(dataObj.changeInHumidity) + Math.abs(dataObj.changeInDewPoint) + Math.abs(dataObj.changeInWindSpeed);

        combinationPairs.push(dataObj);
      })
    })

    let result = _.minBy(combinationPairs, 'resultantChange');

    return res.status(200).json({
        message : 'Success',
        success: true,
        result: result
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
