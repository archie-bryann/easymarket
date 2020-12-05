const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

// Use Traversy media when i've bought domain & hosting plan && Test Before Deployment
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth: {
    user: "webfulservices@gmail.com",
    pass: "wabajockey"
    }
});

module.exports = transporter