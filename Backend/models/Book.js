// --- models/Book.js ---
/*
 * Defines the schema for the 'Book' collection in MongoDB.
 */
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    coverImage: {
        type: String,
        default: 'no-photo.jpg', // A default image placeholder
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', BookSchema);