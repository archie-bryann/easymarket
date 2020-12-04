const http = require('http');
const app = require('./app');
// const dotenv = require('dotenv');
// dotenv.config();

// set timezone
process.env.TZ = 'Africa/Lagos';

const port = process.env.PORT || 9000;



const server = http.createServer(app);

// const dotenv = require('dotenv');
// dotenv.config();

server.listen(port, ()=>console.log(`Server running on port ${port}`));

// console.log(`Your port is ${process.env.PORT}`); // undefined

// console.log(`Your port is ${process.env.PORT}`); // 8626

/*
    Server: 9000
    Client: 7000
    Admin: 5000
    Logistics: 3000
*/ 