const mongoose = require('mongoose');

const UserReceiptSchema = new mongoose.Schema({
  receipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receipt_id'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('UserReceipt', UserReceiptSchema);