const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String
}, { timestamps: true });

const Income = mongoose.model('Income', incomeSchema);

module.exports = { Income };