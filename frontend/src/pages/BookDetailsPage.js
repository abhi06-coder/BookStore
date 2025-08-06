// --- src/pages/BookDetailsPage.js ---
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5001/api/books/${id}`);
                setBook(res.data.data);
            } catch (err) {
                console.error("Failed to fetch book details", err);
            }
            setLoading(false);
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="loading-div">Loading...</div>;
    if (!book) return <div className="loading-div">Book not found.</div>;

    return (
        <div className="book-details-container">
            <div className="book-details-image">
                <img src={book.coverImage !== 'no-photo.jpg' ? book.coverImage : `https://placehold.co/400x600/e2e8f0/64748b?text=${book.title}`} alt={book.title} />
            </div>
            <div className="book-details-info">
                <h1>{book.title}</h1>
                <p className="author">by {book.author}</p>
                <p className="genre">Genre: {book.genre}</p>
                <p className="price">${book.price.toFixed(2)}</p>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button onClick={() => addToCart(book)} className="btn btn-primary" style={{width: '100%', padding: '1rem'}}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default BookDetailsPage;