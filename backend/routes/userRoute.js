const express = require('express');
const authVerify = require('../middleware/auth-verify');
const { signup, login, refresh, logout, user } = require('../controller/authController');
const router = express.Router();


router.route('/register').post(signup);
router.route('/login').post(login);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);
router.route('/user').get(authVerify,user);


module.exports = router;