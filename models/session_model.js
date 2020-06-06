const mongoose = require('mongoose');
const product = require('./product_model');

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  cart: Array
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;