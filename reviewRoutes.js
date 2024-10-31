// routes/reviewRoutes.js
const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Add a new review
router.post('/', async (req, res) => {
    const { gameId, userId, rating, comment } = req.body;
    const newReview = new Review({ gameId, userId, rating, comment });

    try {
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', newReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get reviews for a specific game
router.get('/:gameId', async (req, res) => {
    const reviews = await Review.find({ gameId: req.params.gameId }).populate('userId', 'username');
    res.json(reviews);
});

// Other review-related routes can be added here...

module.exports = router;
