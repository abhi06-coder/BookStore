// --- src/pages/CartPage.js ---
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.post('http://localhost:5001/api/cart/checkout', { cartItems, total }, config);
            setMessage(res.data.message);
            clearCart();
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            setMessage('Checkout failed. Please try again.');
            console.error('Checkout error', error);
        }
    };

    return (
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {message && <p className="message" style={{backgroundColor: '#d4edda', color: '#155724'}}>{message}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/" style={{color: '#007bff'}}>Go Shopping</Link></p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <div className="cart-item-info">
                                <img src={item.coverImage !== 'no-photo.jpg' ? item.coverImage : `https://placehold.co/100x150/e2e8f0/64748b?text=Book`} alt={item.title}/>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.qty}
                                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                />
                                <button onClick={() => removeFromCart(item._id)} style={{color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer'}}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h2>Total: ${total.toFixed(2)}</h2>
                        <button onClick={handleCheckout} className="btn btn-success">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
