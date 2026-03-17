const League = require('../models/League');

// @desc    Get all leagues
// @route   GET /api/leagues
exports.getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json({ success: true, count: leagues.length, data: leagues });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single league
// @route   GET /api/leagues/:id
exports.getLeague = async (req, res) => {
  try {
    const league = await League.findOne({ id: req.params.id });
    if (!league) {
      return res.status(404).json({ success: false, error: 'League not found' });
    }
    res.status(200).json({ success: true, data: league });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create league
// @route   POST /api/leagues
exports.createLeague = async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json({ success: true, data: league });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update league
// @route   PUT /api/leagues/:id
exports.updateLeague = async (req, res) => {
  try {
    const league = await League.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!league) {
      return res.status(404).json({ success: false, error: 'League not found' });
    }
    res.status(200).json({ success: true, data: league });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete league
// @route   DELETE /api/leagues/:id
exports.deleteLeague = async (req, res) => {
  try {
    const league = await League.findOneAndDelete({ id: req.params.id });
    if (!league) {
      return res.status(404).json({ success: false, error: 'League not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
