const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Email credentials from .env file
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Function to send email
const sendEmail = (recipient, resumePath) => {
  const mailOptions = {
    from: emailUser,
    to: recipient,
    subject: 'My Resume',
    text: 'Please find attached my resume for your reference.',
    attachments: [
      {
        filename: 'Indalkar_Vijay_Web_Dev.pdf',
        path: resumePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error: ${error}`);
    }
    console.log(`Email sent to ${recipient}: ${info.response}`);
  });
};

// Read email addresses from file and send the resume
const emailListPath = path.join(__dirname, 'emailList.txt');
const resumePath = path.join(__dirname, 'Indalkar_Vijay_Web_Dev.pdf');

fs.readFile(emailListPath, 'utf8', (err, data) => {
  if (err) {
    return console.log(`Error reading email list: ${err}`);
  }
  const emailAddresses = data.split('\n').filter(email => email.trim() !== '');
  emailAddresses.forEach(email => {
    sendEmail(email.trim(), resumePath);
  });
});
