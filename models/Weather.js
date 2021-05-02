const mongoose = require("mongoose");

const CurrentWeatherSchema = new mongoose.Schema({
  dt: {
    type: Date,
    set: function(value){
      return value * 1000
    }
  },
  sunrise: {
    type: Date,
    set: function(value){
      return value * 1000
    }
  },
  sunset: {
    type: Date,
    set: function(value){
      return value * 1000
    }
  },
  temp: {
    type: Number
  },
  feels_like: {
    type: Number
  },
  pressure: {
    type: Number
  },
  humidity: {
    type: Number
  },
  dew_point: {
    type: Number
  },
  uvi: {
    type: Number
  },
  clouds: {
    type: Number
  },
  visibility: {
    type: Number
  },
  wind_speed: {
    type: Number
  },
  wind_deg: {
    type: Number
  }
}, {_id: false});

const WeatherSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, 'Please add a latitude'],
    unique: true,
    index : true,
  },
  longitude: {
    type: Number,
    required: [true, 'Please add a longitude'],
    unique: true,
    index : true,
  },
  current: [ CurrentWeatherSchema ],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  toObject: {
    transform: true
  }
});

//pre-query methods

module.exports = mongoose.model("Weather", WeatherSchema);
