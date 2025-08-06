// --- src/components/Header.js ---
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="header">
            <nav className="header-nav">
                <Link to="/" className="header-logo">BookNook</Link>
                <div className="header-links">
                    <Link to="/cart" className="cart-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItemCount > 0 && (
                             <span className="cart-count">{cartItemCount}</span>
                        )}
                    </Link>
                    {user ? (
                        <>
                            {user.isAdmin && <Link to="/admin">Admin Panel</Link>}
                            <span>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;