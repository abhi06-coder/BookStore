// --- src/pages/HomePage.js ---
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (genre) params.append('genre', genre);
                
                const res = await axios.get(`http://localhost:5001/api/books?${params.toString()}`);
                setBooks(res.data.data);
            } catch (err) {
                console.error("Failed to fetch books", err);
            }
            setLoading(false);
        };
        fetchBooks();
    }, [searchTerm, genre]);
    
    const genres = ["Fiction", "Science Fiction", "Fantasy", "Mystery", "Biography", "History"];

    return (
        <div>
            <div className="home-header">
                <h1>Welcome to BookNook</h1>
                <p>Find your next great read.</p>
                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">All Genres</option>
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </div>
            {loading ? (
                <div className="loading-div">Loading books...</div>
            ) : (
                <div className="books-grid">
                    {books.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;