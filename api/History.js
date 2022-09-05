const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  icon: String,
  name: String,
  city: String,
  country: String,
  main: String,
  description: String,
  temp: Number,
  pressure: Number,
  humidity: Number
})

const History = mongoose.model('History', HistorySchema)
module.exports = History