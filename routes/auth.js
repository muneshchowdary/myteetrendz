const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail, sendResetEmail } = require('../utils/email');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const verificationToken = Math.random().toString(36).substr(2);
  const user = new User({ email, username, passwordHash, verificationToken });
  await user.save();
  sendVerificationEmail(email, verificationToken);
  res.json({ message: 'Signup successful. Verify your email.' });
});

router.post('/verify', async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });
  if (user && user.verificationToken === token) {
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    res.json({ message: 'Email verified.' });
  } else {
    res.status(400).json({ message: 'Invalid token.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    if (!user.isVerified) return res.status(403).json({ message: 'Verify your email.' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { email, username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});

router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.resetToken = Math.random().toString(36).substr(2);
    await user.save();
    sendResetEmail(email, user.resetToken);
    res.json({ message: 'Reset email sent.' });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.resetToken === token) {
    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetToken = null;
    await user.save();
    res.json({ message: 'Password updated.' });
  } else {
    res.status(400).json({ message: 'Invalid token.' });
  }
});

module.exports = router;
