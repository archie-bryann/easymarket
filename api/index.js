const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

// set environment variables
// process.env.TZ = 'Africa/Lagos';
// process.env.rootUrl="http://localhost:9000/"
// process.env.clientRootUrl="http://localhost:3000/"
// process.env.host="localhost"
// process.env.database="easymarket"
// process.env.dbUser="root"
// process.env.dbPassword=""
// process.env.JWT_KEY="knakprn4y922okewnin4202iKSKNFPJABGDKNNA2329U492P4NDSDSJ"
// process.env.mailUser="webfulservices@gmail.com"
// process.env.mailPassword=""
// process.env.adminEmail="archiebryann"
// process.env.adminPassword="iospecial123"
// process.env.logisticsUsername="amadurs"
// process.env.logisticsPassword="nelson123"
// process.env.paystackTestSecretKey="sk_test_f12711e9277e1a27aba8e58f3394b9717098efaf"
// process.env.paystackLiveSecretKey="sk_live_a1dcea8728533113e2ed504cf833d372b9b6a737"


const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port, ()=>console.log(`Server running on port ${port}`));

