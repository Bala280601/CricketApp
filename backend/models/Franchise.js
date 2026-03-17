const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  leagueId: { type: String, required: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  city: { type: String, required: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  accentColor: { type: String, required: true },
  gradient: [String],
  logoEmoji: { type: String },
  logo: { type: String }, // URL or path
  jerseyPattern: { type: String },
  purse: { type: Number, default: 1000 },
  maxPlayers: { type: Number, default: 25 },
  playerIds: [String],
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  titles: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Franchise', FranchiseSchema);
