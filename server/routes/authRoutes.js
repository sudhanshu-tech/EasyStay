const express = require('express');
const { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } = require('../controllers/authController');
const { userAuth } = require('../middleware/userAuth');

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/logout',logout);
authRouter.post('/sendVerifyOtp',userAuth,sendVerifyOtp);
authRouter.post('/verifyAccount',userAuth,verifyEmail);
authRouter.get('/isAuthenticated',userAuth,isAuthenticated);
authRouter.post('/sendResetOtp',sendResetOtp);
authRouter.post('/resetPassword',resetPassword);

module.exports = authRouter;