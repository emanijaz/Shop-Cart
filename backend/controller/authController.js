
const bcrypt = require('bcrypt');
const catchAsyncError = require('../middleware/asyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("189093438619-aqjp61l48qrbsv6okstcldm0a5bnoii0.apps.googleusercontent.com")
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PZscnFND5h0Xtc7iBRX9ZTNP1pX5kCzEy0vAlblXOi9ZaC5lHCeNOG4K1gbzZoKAqJ8RyI1TSpRWL7j7jmFOcvX00N4CeNgME'); // Replace with your Stripe secret key


exports.signup = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: email, password: hashedPassword, username: username });
    await user.save();
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '2h',
    });
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    return next(new ErrorHandler(500, `${error}. Registration failed`));
  }
});

exports.login = catchAsyncError(async(req,res,next)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(401, "User isn't found for given email"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
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
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed , ${error}`));
  }
})

exports.refresh = catchAsyncError(async(req,res,next)=> {
  console.log('in refresh')
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken){
      return next(new ErrorHandler(401, "no refresh token found"));
    } 
  
    jwt.verify(refreshToken, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
        expiresIn: '15m',
      });
      res.json({ accessToken });
    });
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed in refreshing token , ${error}`));
  }
})

exports.logout = catchAsyncError(async(req,res,next)=> {

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

exports.googleLogin = catchAsyncError(async(req,res,next)=> {
  try {
    const { token }  = req.body   
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "189093438619-aqjp61l48qrbsv6okstcldm0a5bnoii0.apps.googleusercontent.com"
    });
    const { name, email } = ticket.getPayload();    


    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(token, 10); // creating user with token set as password
      const newUser = new User({ email: email, password: hashedPassword, username: name });
      user = await newUser.save();

    }
    
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '2h',
    });
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed , ${error}`));
  }
})

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  try {
      // Access the authenticated user data from req.userData
      const user = req.userData;
      // console.log('user fetched details: ', user)
      // Check if the user is authenticated
      if (!user) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      const foundUser = await User.findOne({email: user.email})
      console.log(foundUser)

      res.status(200).json(foundUser);
  } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

  exports.updateUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = req.userData;
        console.log('user fetched details: ', user)
        // Check if the user is authenticated
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const { firstName, lastName, email, phone, gender, profilePhoto } = req.body;

  
      let userFound = await User.findById(req.params.id);
      if (firstName) userFound.firstName = firstName;
      if (lastName) userFound.lastName = lastName;
      if (email) userFound.email = email;
      if (phone) userFound.phone = phone;
      if (gender) userFound.gender = gender;
      if (profilePhoto) userFound.profilePhoto = profilePhoto;

      await userFound.save();
      res.status(200).json({ message: 'User updated successfully', userFound });

        
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });


exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    const users = await User.find(); // Exclude password field
    res.status(200).json({success: "true", users});
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  try {
      console.log(req.params.id);
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

exports.createPaymentIntent = catchAsyncError(async (req, res, next) => {
  const  amount  = req.body.totalPrice;
  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount, // Amount in cents
          currency: 'usd',
          payment_method_types: ['card'],
      });
      console.log('client sec: ',paymentIntent.client_secret);
      res.send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
})