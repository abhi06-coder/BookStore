// --- routes/books.js ---
/*
 * Defines CRUD routes for books.
 * Admin-only routes are protected by middleware.
 */
const express = require('express');
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/books');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getBooks).post(protect, authorize('admin'), createBook);

router
    .route('/:id')
    .get(getBook)
    .put(protect, authorize('admin'), updateBook)
    .delete(protect, authorize('admin'), deleteBook);

module.exports = router;
