const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.id) {
            req.user = { id: decoded.id };  // Attach user info to req.user
            return next();
        }

        return res.status(401).json({ message: "Unauthorized: Invalid token" });

    } catch (error) {
        console.error("JWT verification failed:", error.message); // optional logging
        return res.status(401).json({ message: "Unauthorized: Token verification failed" });
    }
};

module.exports = { userAuth };
