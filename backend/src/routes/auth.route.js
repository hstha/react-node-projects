const express = require('express');
const { runValidation } = require("../validators/index.validator");
const { signup, login, activateAccount, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { userSignupValidator, userLoginValidator, userForgetPasswordValidator, userResetPasswordValidator } = require("../validators/auth.validator");

const router = express.Router();

router.post('/activate-account', activateAccount);
router.post('/login', userLoginValidator, runValidation, login);
router.post('/signup', userSignupValidator, runValidation, signup);
router.put('/forget-password', userForgetPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', userResetPasswordValidator, runValidation, resetPassword);

module.exports = router;