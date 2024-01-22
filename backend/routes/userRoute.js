const express = require('express');
const { signup, login } = require('../controller/authController');
const authVerify = require('../middleware/auth-verify');
const router = express.Router();


router.route('/register').post(signup);
router.route('/login').post(login);

module.exports = router;