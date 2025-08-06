// --- controllers/auth.js ---
/*
 * Contains the logic for user registration and login.
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const user = await User.create({ name, email, password, isAdmin });
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
};


// Helper function to create token and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
};
