const db = require('../../db');

module.exports.index = function(req, res) {
  res.json(db.get('products').value());
};