const express = require('express');
const { runValidation } = require("../validators/index.validator");
const { userSignupValidator } = require("../validators/auth.validator");
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', login);
router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;