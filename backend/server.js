const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('Cricket App API is running...');
});

// Import routes
const playerRoutes = require('./routes/playerRoutes');
const franchiseRoutes = require('./routes/franchiseRoutes');
const leagueRoutes = require('./routes/leagueRoutes');

// Mount routes
app.use('/api/players', playerRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/leagues', leagueRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
