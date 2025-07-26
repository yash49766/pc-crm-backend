const express = require('express');
const Billing = require('../models/Billing');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all billing records
router.get('/', auth, async (req, res) => {
  try {
    const billing = await Billing.find().populate('client project');
    res.json(billing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one billing record
router.get('/:id', auth, async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id).populate('client project');
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create billing record
router.post('/', auth, async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update billing record
router.put('/:id', auth, async (req, res) => {
  try {
    const bill = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete billing record
router.delete('/:id', auth, async (req, res) => {
  try {
    const bill = await Billing.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });
    res.json({ message: 'Billing record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 