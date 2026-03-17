const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load models
const Player = require('./models/Player');
const Franchise = require('./models/Franchise');
const League = require('./models/League');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Custom function to create stats
const mkStats = (m, r, avg, sr, f, h, frs, six) => ({
  matches: m, runs: r, average: avg, strikeRate: sr, fifties: f, hundreds: h, fours: frs, sixes: six,
});
const mkBowling = (m, w, eco, bavg, best, fw) => ({
  matches: m, wickets: w, economy: eco, bowlingAverage: bavg, bestFigures: best, fiveWickets: fw,
});

// Leagues Data
const leagues = [
  { id: 'ipl', name: 'Indian Premier League', shortName: 'IPL', color: '#004BA0' },
  { id: 'sa20', name: 'SA20 League', shortName: 'SA20', color: '#007A33' },
  { id: 'bbl', name: 'Big Bash League', shortName: 'BBL', color: '#ED1B24' },
  { id: 'hundred', name: 'The Hundred', shortName: '100', color: '#E91E63' },
  { id: 'lpl', name: 'Lanka Premier League', shortName: 'LPL', color: '#005AC7' },
  { id: 't10', name: 'Abu Dhabi T10', shortName: 'T10', color: '#FFD700' },
];

// Load Data
const { players, franchises } = require('./data/seedData');

// Import Data
const importData = async () => {
  try {
    await League.deleteMany();
    await Player.deleteMany();
    await Franchise.deleteMany();

    await League.create(leagues);
    await Player.create(players);
    await Franchise.create(franchises);
    
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await League.deleteMany();
    await Player.deleteMany();
    await Franchise.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
