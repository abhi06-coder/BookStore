// --- src/App.js ---
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css'; // Import custom CSS

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app-container">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/books/:id" element={<BookDetailsPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route 
                                    path="/admin"
                                    element={
                                        <PrivateRoute adminOnly={true}>
                                            <AdminPage />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;