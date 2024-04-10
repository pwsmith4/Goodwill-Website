const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  receipt_id: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: String,
    required: true
  },
  store_number: {
    type: Number,
    required: true
  },
  donation_value: {
    type: Number,
  }
});

module.exports = mongoose.model('user_receipts', ReceiptSchema);