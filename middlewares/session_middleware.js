const shortid = require('shortid');
const db = require('../db');

module.exports = function(req, res, next) {
  var sessionId = shortid.generate();
  var userId = req.signedCookies.userId;

  if(!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });

    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  
  next();
};