// --- server.js (Main Entry Point) ---
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/books', require('./routes/books'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart')); // Added for cart simulation

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
