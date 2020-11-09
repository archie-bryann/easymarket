const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mailUser,
        password: process.env.mailPassword 
    }
});


module.exports = transporter