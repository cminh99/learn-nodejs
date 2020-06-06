const shortid = require('shortid');
const Session = require('../models/session_model');

module.exports = async function(req, res, next) {
  var sessionId = shortid.generate();

  if(!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    
    var newSession = new Session({
      sessionId: sessionId,
      cart: []
    });
    await newSession.save();
  }
  
  next();
};