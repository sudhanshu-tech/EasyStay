const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer');

// register
const register = async (req, resp) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return resp.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        resp.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // sending WELCOME EMAIL
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our website',
            text: `Hi ${user.name},\n\nWelcome to our website! We're excited to have you join us.\n\nBest regards,\nYour Team`,
        }
        await transporter.sendMail(mailOptions);

        return resp.status(200).json({
            success: true,
            message: "User created successfully",
        })

    } catch (error) {
        resp.json({
            success: false,
            message: error.message
        })
    }
}
// login
const login = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        resp.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return resp.status(200).json({
            success: true,
            message: "User logged in successfully",
        })

    } catch (error) {
        resp.json({
            success: false,
            message: error.message
        })
    }
}

// logout
const logout = async (req, resp) => {
    try {
        resp.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return resp.status(200).json({
            success: true,
            message: "User logged out successfully",
        })
    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// sendVarifyOtp
const sendVerifyOtp = async (req, resp) => {
    
    try {
        const { id:userId } = req.user;
        if (!userId) {
            return resp.status(400).json({
                success: false,
                message: "Please enter all fields"
            })
        }
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return resp.status(400).json({
                success: false,
                message: "User already verified"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify your account OTP',
            text: `Hi ${user.name},\n\nYour verify otp is ${otp}\n\nBest regards,\nYour Team`,
        }
        await transporter.sendMail(mailOptions);
        return resp.status(200).json({
            success: true,
            message: "Otp sent successfully",
        })
    } catch (error) {
        resp.json({
            success: false, 
            message: error.message
        })
    }
}

// verifyEmail
const verifyEmail = async (req, resp) => {
        const { id: userId } = req.user;          // from token
         const { otp } = req.body;                 // from client input

    if(!userId || !otp){
        return resp.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    try {
        const user = await userModel.findById(userId);
        if(!user){
            return resp.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        if (user.verifyOtp !== otp || !user.verifyOtp === '') {
            return resp.status(400).json({
                success: false,
                message: "Incorrect otp"
            })
        }
        if (Date.now() > user.verifyOtpExpireAt) {
            return resp.status(400).json({
                success: false,
                message: "Otp expired"
            })
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return resp.status(200).json({
            success: true,            
            message: "User verified successfully",
        })
    } catch (error) {
        resp.json({
            success: false,
            message: error.message
        })
    }
}

//check if user is authenticated
const isAuthenticated = async (req, resp) => {
    try {
       return resp.status(200).json({ success: true, message: "User is authenticated" });
    } catch (error) {
        console.error("JWT verification failed:", error.message); // optional logging
        return resp.status(401).json({ message: "Unauthorized: Token verification failed" });
    }
}

//Send Password Reset OTP
const sendResetOtp=async(req,resp)=>{
    const {email}=req.body;
    if(!email){
        return resp.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset your password OTP',
            text: `Hi ${user.name},\n\nYour reset otp is ${otp}\n\nBest regards,\nYour Team`,
        }
        await transporter.sendMail(mailOptions);
        return resp.status(200).json({
            success: true,
            message: "Otp sent successfully",
        })
    } catch (error) {
        resp.json({
            success: false,
            message: error.message
        })
    }   
}

//Reset user Password
const resetPassword=async(req,resp)=>{
    const {email,otp,password}=req.body;
    if(!email || !otp || !password){
        return resp.status(400).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return resp.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        if (user.resetOtp !== otp || !user.resetOtp) {
            return resp.status(400).json({
                success: false,            
                message: "Incorrect otp"
            })
        }
        if (Date.now() > user.resetOtpExpireAt) {
            return resp.status(400).json({
                success: false,
                message: "Otp expired"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return resp.status(200).json({
            success: true,
            message: "Password reset successfully",
        })
    } catch (error) {
        resp.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendResetOtp,
    resetPassword
}