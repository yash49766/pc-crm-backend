const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  status: { type: String, default: 'unpaid' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Billing', BillingSchema); 