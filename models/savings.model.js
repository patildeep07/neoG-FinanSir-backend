const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String
}, { timestamps: true });

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = { Savings };