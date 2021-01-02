const { check } = require('express-validator');

console.log('[validator: auth]');

exports.userSignupValidator = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

exports.userLoginValidator = [
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').not().isEmpty().withMessage('Password is required')
]