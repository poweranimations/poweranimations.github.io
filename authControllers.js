const User = require('../models/User');
const bcrypt = require('bcrypt');

// Sign up
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: req.file ? req.file.path : null
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating user: ' + error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        return res.status(200).json({ success: true, message: 'Login successful!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error logging in: ' + error.message });
    }
};
