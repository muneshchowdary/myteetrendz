const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({/* SMTP config */});

function sendVerificationEmail(email, token) {
  transporter.sendMail({
    to: email,
    subject: 'Verify your email',
    text: `Click to verify: http://localhost:3000/verify?email=${email}&token=${token}`,
  });
}

function sendResetEmail(email, token) {
  transporter.sendMail({
    to: email,
    subject: 'Reset your password',
    text: `Click to reset: http://localhost:3000/reset?email=${email}&token=${token}`,
  });
}

module.exports = { sendVerificationEmail, sendResetEmail };
