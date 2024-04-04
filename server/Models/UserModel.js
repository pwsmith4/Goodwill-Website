const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
    phoneNumber: {
        type: String,
        required: [true, "Your phone number is required"],
    },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
    lastName: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    streetAddress2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String,
    },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  id: {
    type: String,
  },
  receipts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receipt'
  }]
});

userSchema.methods.updateWithoutHashing = function(data, callback) {
  const user = this;

  const update = {
    email: data.email || user.email,
    firstName: data.firstName || user.firstName,
    phoneNumber: data.phoneNumber || user.phoneNumber,
    lastName: data.lastName || user.lastName,
    streetAddress: data.streetAddress || user.streetAddress,
    streetAddress2: data.streetAddress2 || user.streetAddress2,
    city: data.city || user.city,
    state: data.state || user.state,
    zipcode: data.zipcode || user.zipcode,
    id: data.id || user.id,
    receipts: data.receipts || user.receipts
  };

  return User.updateOne({ _id: user._id }, { $set: update }, callback);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);