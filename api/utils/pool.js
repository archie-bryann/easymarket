var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database
});

console.log({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database
});

module.exports = pool