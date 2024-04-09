const mongoose = require('mongoose');

const UserReceiptSchema = new mongoose.Schema({
  receipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receipt_id'
  }
});

module.exports = mongoose.model('UserReceipt', UserReceiptSchema);