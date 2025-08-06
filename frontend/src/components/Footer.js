// --- src/components/Footer.js ---
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} BookNook. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;