module.exports.postCreate = function(req, res, next) {
  var errors = [];
  
  if(!req.file) {
    errors.push('Image is required!');
  }
  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.description) {
    errors.push('Desciption is required!');
  }
  if(!req.body.price) {
    errors.push('Price is required!');
  }
  
  if(errors.length) {
    res.render('products/create', {
      errors: errors,
      values: req.body
    });
    return;
  }

  next();
};