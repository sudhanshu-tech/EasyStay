const express = require('express');
const { getUserData } = require('../controllers/userControllers');
const { userAuth } = require('../middleware/userAuth');

const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserData);

module.exports = userRouter;