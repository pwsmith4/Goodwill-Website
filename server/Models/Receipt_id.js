const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  receipt_id: {
    type: String,
    required: true,
    unique: function() {
      return this.store_number != 'N/A';
    }
  },
  timestamp: {
    type: String,
    required: true
  },
  store_number: {
    type: String,
    required: true
  },
  donation_value: {
    type: Number,
  }
});

module.exports = mongoose.model('Receipt_id', ReceiptSchema);