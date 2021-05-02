const axios = require('axios').default;

const pairs = require('../config/info.json');


const getForecast = async(next) => {
    try{
        let api = process.env.WEATHER_API;
    
        let promArr = []
        pairs.forEach((pair) => {
            let request = api + 'lat=' + pair[0] + '&lon=' + pair[1]; 
    
            let apiKey = process.env.WEATHER_API_KEY;
    
            request += '&exclude=hourly,daily';
            request += '&appid=' + apiKey;
            
            let prom = axios.get(request);
            promArr.push(prom);
        })
    
        return Promise.all(promArr);
    }
    catch(err){
        next(err);
    }
}


module.exports = {
    getForecast: getForecast
}