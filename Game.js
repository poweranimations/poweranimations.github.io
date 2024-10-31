// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
