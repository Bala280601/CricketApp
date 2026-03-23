const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load models
const Player = require('./models/Player');
const Franchise = require('./models/Franchise');
const League = require('./models/League');

const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Load Data
const { players, franchises, leagues } = require('./data/seedData');


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
