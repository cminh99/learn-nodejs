const shortid = require('shortid');
const db = require('../db');
const Session = require('../models/session_model');

module.exports = async function(req, res, next) {
  var sessionId = shortid.generate();
  var userId = req.signedCookies.userId;

  if(!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    
    await Session.insertMany({ sessionId: sessionId });
    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  
  next();
};