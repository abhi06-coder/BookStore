// --- src/components/BookCard.js ---
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const BookCard = ({ book }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="book-card">
            <Link to={`/books/${book._id}`}>
                <img src={book.coverImage !== 'no-photo.jpg' ? book.coverImage : `https://placehold.co/400x600/e2e8f0/64748b?text=${book.title}`} alt={book.title} className="book-card-image"/>
            </Link>
            <div className="book-card-content">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="book-card-footer">
                    <span className="book-card-price">${book.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(book)} className="btn btn-primary">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
