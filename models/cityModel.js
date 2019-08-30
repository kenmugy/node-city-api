const mongoose = require('mongoose');

const { Schema } = mongoose;

const citySchema = new Schema({
  city: String,
  growth_from_2000_to_2013: String,
  latitude: Number,
  longitude: Number,
  population: String,
  rank: String,
  state: String
});

module.exports = mongoose.model('city', citySchema);
