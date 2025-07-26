const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  status: { type: String, default: 'active' },
  startDate: { type: Date },
  endDate: { type: Date },
  budget: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema); 