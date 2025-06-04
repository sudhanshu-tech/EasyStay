const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/mern-auth`, {    
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = { connectDb };
