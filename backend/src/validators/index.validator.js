const { validationResult } = require('express-validator');

console.log('[validator: index]');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = [];
    errors.array().forEach(error => {
      messages.push(error.msg);
    })
    return res.status(422).json({
      success: false,
      message: messages,
      data: errors.array()
    });
  }

  next();
}