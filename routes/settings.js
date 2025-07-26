const express = require('express');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');
const router = express.Router();

// Get settings for current user
router.get('/', auth, async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update settings for current user
router.post('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (settings) {
      settings = await Settings.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
      return res.json(settings);
    }
    settings = new Settings({ ...req.body, user: req.user.id });
    await settings.save();
    res.status(201).json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete settings for current user
router.delete('/', auth, async (req, res) => {
  try {
    await Settings.findOneAndDelete({ user: req.user.id });
    res.json({ message: 'Settings deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 