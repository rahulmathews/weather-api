const axios = require('axios').default;


const getForecast = async(next) => {
    try{
        const pairs = [
            [17.385044, 78.486671],
            [48.856613, 2.352222],
            [40.712776, -74.005974],
            [41.878113, -87.629799],
            [47.751076, -120.740135],
            [51.5073219, -0.1276474],
            [35.6828387, 139.7594549],
            [-33.8548157, 151.2164539],
            [36.7014631, -118.755997],
            [37.5666791, 126.9782914]
        ]
    
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