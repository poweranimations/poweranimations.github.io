// routes/gameRoutes.js
const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Add a new game
router.post('/', async (req, res) => {
    const { title, description, price, releaseDate } = req.body;
    const newGame = new Game({ title, description, price, releaseDate });

    try {
        await newGame.save();
        res.status(201).json({ message: 'Game added successfully', newGame });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all games
router.get('/', async (req, res) => {
    const games = await Game.find();
    res.json(games);
});

// Other game-related routes can be added here...

module.exports = router;
