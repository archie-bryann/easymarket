const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: "webfulservices@gmail.com",
        pass: "wabajockey" 
    }
});


module.exports = transporter