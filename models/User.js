const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetToken: String,
  profile: {
    name: String,
    address: String,
    phone: String,
  }
});

module.exports = mongoose.model('User', userSchema);
