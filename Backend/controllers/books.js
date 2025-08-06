// --- controllers/books.js ---
/*
 * Contains the logic for book-related operations.
 */
const Book = require('../models/Book');

// @desc    Get all books (with filtering and searching)
// @route   GET /api/books
exports.getBooks = async (req, res) => {
    try {
        let query;
        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);
        
        let queryStr = JSON.stringify(reqQuery);
        
        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = Book.find(JSON.parse(queryStr));

        // Search by title or author
        if (req.query.search) {
             const searchQuery = { $regex: req.query.search, $options: 'i' };
             query = query.or([{ title: searchQuery }, { author: searchQuery }]);
        }

        const books = await query;
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Create new book
// @route   POST /api/books
exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
