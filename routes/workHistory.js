const express = require('express');
const WorkHistory = require('../models/WorkHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all work history records
router.get('/', auth, async (req, res) => {
  try {
    const records = await WorkHistory.find().populate('user');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one work history record
router.get('/:id', auth, async (req, res) => {
  try {
    const record = await WorkHistory.findById(req.params.id).populate('user');
    if (!record) return res.status(404).json({ message: 'Work history not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create work history record
router.post('/', auth, async (req, res) => {
  try {
    const record = new WorkHistory(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update work history record
router.put('/:id', auth, async (req, res) => {
  try {
    const record = await WorkHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: 'Work history not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete work history record
router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await WorkHistory.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Work history not found' });
    res.json({ message: 'Work history deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 