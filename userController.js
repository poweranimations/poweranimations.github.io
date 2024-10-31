const User = require('../models/User');
const bcrypt = require('bcrypt');

// Sign up
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please login.' });
        }

        // Check if the username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username already taken. Please choose another one.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: req.file ? req.file.path : null // Store the path of the uploaded profile picture
        });

        // Save the user to the database
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
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Successful login
        return res.status(200).json({ success: true, message: 'Login successful!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error logging in: ' + error.message });
    }
};

// Optional: Get user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you're using middleware to set req.user
        const user = await User.findById(userId).select('-password'); // Exclude the password

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching user profile: ' + error.message });
    }
};

// Optional: Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you're using middleware to set req.user
        const updates = req.body;

        // Update user details
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, message: 'Profile updated successfully!', user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating profile: ' + error.message });
    }
};
