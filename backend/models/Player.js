const mongoose = require('mongoose');

const FormatStatsSchema = new mongoose.Schema({
  matches: { type: Number, default: 0 },
  runs: { type: Number },
  average: { type: Number },
  strikeRate: { type: Number },
  fifties: { type: Number },
  hundreds: { type: Number },
  fours: { type: Number },
  sixes: { type: Number },
  wickets: { type: Number },
  economy: { type: Number },
  bowlingAverage: { type: Number },
  bestFigures: { type: String },
  fiveWickets: { type: Number }
}, { _id: false });

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  leagueIds: [String],
  name: { type: String, required: true },
  country: { type: String, required: true },
  age: { type: Number },
  role: { 
    type: String, 
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'],
    required: true 
  },
  tier: { 
    type: String, 
    enum: ['GOLD', 'SILVER', 'BRONZE'],
    required: true 
  },
  basePrice: { type: Number, required: true },
  profileColor: { type: String },
  nationality: { 
    type: String, 
    enum: ['Indian', 'Overseas'],
    required: true 
  },
  batting: {
    t10: FormatStatsSchema,
    t20: FormatStatsSchema,
    odi: FormatStatsSchema,
    test: FormatStatsSchema
  },
  bowling: {
    style: { type: String },
    paceKmh: { type: Number },
    t10: FormatStatsSchema,
    t20: FormatStatsSchema,
    odi: FormatStatsSchema,
    test: FormatStatsSchema
  },
  fielding: {
    catches: { type: Number, default: 0 },
    runOuts: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 },
    agility: { type: Number, min: 1, max: 10 }
  },
  speciality: [String],
  isSold: { type: Boolean, default: false },
  soldTo: { type: String },
  soldPrice: { type: Number },
  isRTM: { type: Boolean, default: false },
  teamId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayerSchema);
