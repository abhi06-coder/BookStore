// --- src/context/CartContext.js ---
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item._id === book._id);
            if (exist) {
                return prevItems.map(item =>
                    item._id === book._id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prevItems, { ...book, qty: 1 }];
            }
        });
    };

    const removeFromCart = (bookId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== bookId));
    };

    const updateQuantity = (bookId, qty) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === bookId ? { ...item, qty: qty } : item
            )
        );
    };
    
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;