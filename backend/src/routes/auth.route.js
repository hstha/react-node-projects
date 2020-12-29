const express = require('express');
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/login', login);
router.get('/signup', signup);

module.exports = router;