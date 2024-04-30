const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  receipt_id: {
    type: String,
    required: true,
    unique: function() {
      return this.receipt_id !== "unique_id";
    }
  },
  timestamp: {
    type: String,
    required: true
  },
  store_number: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  donation_value: {
    type: Number,
  }
});

module.exports = mongoose.model('Receipt_id', ReceiptSchema);