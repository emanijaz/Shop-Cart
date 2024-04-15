
const bcrypt = require('bcrypt');
const catchAsyncError = require('../middleware/asyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

exports.signup = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: email, password: hashedPassword, username: username });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return next(new ErrorHandler(500, `${error}. Registration failed`));
  }
});

exports.login = catchAsyncError(async(req,res,next)=> {
  console.log('in login')
  try {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(401, "User isn't found for given email"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("password match :", passwordMatch)
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Authentication failed, password didn't match"));

    }
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '2h',
    });
    res.status(200).json({ accessToken, refreshToken });
    // res.status(200).json({ token, user: user });
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed , ${error}`));
  }
})

exports.refresh = catchAsyncError(async(req,res,next)=> {
  console.log('in refresh')
  try {
    const refreshToken = req.body.refreshToken;
    console.log("refresh token in refresh : ", refreshToken)
    if (!refreshToken){
      return next(new ErrorHandler(401, "no refresh token found"));
    } 
  
    jwt.verify(refreshToken, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
        expiresIn: '15m',
      });
      console.log("new access token : ", accessToken)
      res.json({ accessToken });
    });
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed in refreshing token , ${error}`));
  }
})

exports.logout = catchAsyncError(async(req,res,next)=> {
  console.log('in logout')
  // Clear the refresh token on the server
  // You may want to implement additional security measures here
  // such as blacklisting the token
  res.sendStatus(204);
})

exports.user = catchAsyncError(async (req, res, next) => {
  try {
      // Access the authenticated user data from req.userData
      const user = req.userData;
      console.log('user fetched in auth controller: ', user)
      // Check if the user is authenticated
      if (!user) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      // Return user data
      res.json(user);
  } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});