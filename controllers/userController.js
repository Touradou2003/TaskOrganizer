// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Connexion
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Modifier les informations personnelles
exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { username, password } = req.body;
    try {
        const updateData = { username };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
