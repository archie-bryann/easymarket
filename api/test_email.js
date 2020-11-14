var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth: {
            user: process.env.mailUser, 
            pass: process.env.mailPassword, 
        }
});

console.log(process.env.mailUser)

var mailOptions = {
  from: 'webfulservices@gmail.com',
  to: 'ekomboy012@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

console.log(mailOptions)

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});