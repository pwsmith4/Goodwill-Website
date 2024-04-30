const mongoose = require('mongoose');

const UserReceiptSchema = new mongoose.Schema({
  receipt_id: {
    type: String,
    required: true,
    unique: function() {
      return this.receipt_id !== "Cash Donation";
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

module.exports = mongoose.model('userReceipts', UserReceiptSchema);