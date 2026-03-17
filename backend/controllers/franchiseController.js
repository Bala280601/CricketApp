const Franchise = require('../models/Franchise');

// @desc    Get all franchises
// @route   GET /api/franchises
exports.getFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.status(200).json({ success: true, count: franchises.length, data: franchises });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single franchise
// @route   GET /api/franchises/:id
exports.getFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findOne({ id: req.params.id });
    if (!franchise) {
      return res.status(404).json({ success: false, error: 'Franchise not found' });
    }
    res.status(200).json({ success: true, data: franchise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create franchise
// @route   POST /api/franchises
exports.createFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.create(req.body);
    res.status(201).json({ success: true, data: franchise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update franchise
// @route   PUT /api/franchises/:id
exports.updateFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!franchise) {
      return res.status(404).json({ success: false, error: 'Franchise not found' });
    }
    res.status(200).json({ success: true, data: franchise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete franchise
// @route   DELETE /api/franchises/:id
exports.deleteFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findOneAndDelete({ id: req.params.id });
    if (!franchise) {
      return res.status(404).json({ success: false, error: 'Franchise not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
