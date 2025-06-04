const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const {connectDb} = require('./config/mongodb');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');




const app = express();
const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = {
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json());
app.use(cors(allowedOrigins));
app.use(cookieParser());

//API routes
app.get('/',(req, res) => {
    res.send('everything is working fine');
});

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});