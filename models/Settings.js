const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: 'en' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema); 