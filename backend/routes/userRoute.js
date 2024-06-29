const express = require('express');
const authVerify = require('../middleware/auth-verify');

const { signup, login, refresh, logout, user, googleLogin, getUserDetails, updateUser, getAllUsers, deleteUser } = require('../controller/authController');
const router = express.Router();


router.route('/register').post(signup);
router.route('/login').post(login);
router.route('/google-login').post(googleLogin);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);
router.route('/user').get(authVerify,user);
router.route('/user-details').get(authVerify,getUserDetails);
router.route('/update/:id').put(authVerify,updateUser);
router.route('/admin/users').get(getAllUsers);
router.route('/admin/user/:id').delete(deleteUser);




module.exports = router;