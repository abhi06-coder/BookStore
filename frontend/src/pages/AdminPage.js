// --- src/pages/AdminPage.js ---
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', genre: '', price: '', coverImage: '' });
    const [editingBook, setEditingBook] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/books');
            setBooks(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            if (editingBook) {
                await axios.put(`http://localhost:5001/api/books/${editingBook._id}`, formData, config);
                setMessage('Book updated successfully!');
            } else {
                await axios.post('http://localhost:5001/api/books', formData, config);
                setMessage('Book added successfully!');
            }
            resetForm();
            fetchBooks();
        } catch (err) {
            setMessage('An error occurred. Please try again.');
            console.error(err);
        }
        setTimeout(() => setMessage(''), 3000);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({ title: book.title, author: book.author, genre: book.genre, price: book.price, coverImage: book.coverImage || '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                await axios.delete(`http://localhost:5001/api/books/${id}`, config);
                setMessage('Book deleted successfully!');
                fetchBooks();
            } catch (err) {
                setMessage('Failed to delete book.');
                console.error(err);
            }
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', author: '', genre: '', price: '', coverImage: '' });
        setEditingBook(null);
    };

    return (
        <div className="admin-container">
            <div className="admin-form-container">
                <form onSubmit={handleSubmit}>
                    <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                    {message && <p className="message">{message}</p>}
                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
                    <input name="author" value={formData.author} onChange={handleInputChange} placeholder="Author" required />
                    <input name="genre" value={formData.genre} onChange={handleInputChange} placeholder="Genre" required />
                    <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" required />
                    <input name="coverImage" value={formData.coverImage} onChange={handleInputChange} placeholder="Cover Image URL" />
                    <div className="admin-form-buttons">
                        <button type="submit" className="btn btn-primary" style={{flex: 1}}>
                            {editingBook ? 'Update Book' : 'Add Book'}
                        </button>
                        {editingBook && (
                            <button type="button" onClick={resetForm} className="btn btn-secondary" style={{flex: 1}}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="admin-list-container">
                <h2>Manage Books</h2>
                <div style={{overflowX: 'auto'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <button onClick={() => handleEdit(book)} className="btn btn-warning" style={{marginRight: '0.5rem'}}>Edit</button>
                                        <button onClick={() => handleDelete(book._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;