const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: [true, 'Please add a latitude'],
    unique: true,
    index : true,
  },
  longitude: {
    type: String,
    required: [true, 'Please add a longitude'],
    unique: true,
    index : true,
  },
  forecast: [{
    dt: {
      type: Date
    },
    precipitation: {
      type: Number
    }
  }],
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
