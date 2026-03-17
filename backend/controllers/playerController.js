const Player = require('../models/Player');

// @desc    Get all players
// @route   GET /api/players
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json({ success: true, count: players.length, data: players });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single player
// @route   GET /api/players/:id
exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findOne({ id: req.params.id });
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.status(200).json({ success: true, data: player });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create player
// @route   POST /api/players
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ success: true, data: player });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update player
// @route   PUT /api/players/:id
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.status(200).json({ success: true, data: player });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete player
// @route   DELETE /api/players/:id
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndDelete({ id: req.params.id });
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
