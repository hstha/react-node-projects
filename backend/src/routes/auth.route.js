const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { runValidation } = require("../validators");
const { userSignupValidator } = require("../validators/auth");

const router = express.Router();

router.post('/login', login);
router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;