const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  logo: { type: String }, // Path or URL
  color: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('League', LeagueSchema);
