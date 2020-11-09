const http = require('http');
const app = require('./app');

const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port, ()=>console.log(`Server running on port ${port}`));

/*
    Server: 9000
    Client: 7000
    Admin: 5000
    Logistics: 3000
*/ 