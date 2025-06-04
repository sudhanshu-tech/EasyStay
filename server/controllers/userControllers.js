const userModel = require('../models/userModel');

const getUserData = async (req, res) => {
    try {
        const { id: userId } = req.user; 
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            data: {
               name: user.name,
               isAcountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getUserData };