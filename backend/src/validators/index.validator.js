const { validationResult } = require('express-validator');

console.log('[validator: index]');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()
    });
  }

  next();
}