const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const marketRoutes = require('./api/routes/market');
const searchRoutes = require('./api/routes/search');
const cartRoutes = require('./api/routes/cart');
const miscellaneousRoutes = require('./api/routes/miscellaneous');
const logisticsRoutes = require('./api/routes/logistics');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// const corsOptions = {
//     origin:true,
//     credentials:true
// }

// app.options('*', cors(corsOptions));
// app.listen(80, function(){
//     console.log('CORS-enabled web server listening on port 80')
// });

app.use((req,res,next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:6200', 'http://localhost:7000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Origin","*"); // change later
    res.header("Access-Control-Allow-Credentials", "true"); 
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // Disable caching for content files
    
    // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    // res.header("Pragma", "no-cache");
    // res.header("Expires", 0);

    // if(req.method === 'OPTIONS') {
    //     res.status(200).json({});
    // }
    // next();

     //intercepts OPTIONS method
     if ('OPTIONS' === req.method) {
        //respond with 200
        return res.status(200).json({});
        // next();
      }
      else {
      //move on
        next();
      }
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/market', marketRoutes);
app.use('/search', searchRoutes);
app.use('/cart', cartRoutes);
app.use('/miscellaneous', miscellaneousRoutes);
app.use('/logistics', logisticsRoutes);

// sample code to create static filepath
// app.use('/uploads', express.static('img'));

app.use('/uploads', express.static('uploads'));
// app.use(express.static(path.join(__dirname,'public')));

// const originalExit = process.exit;
// process.exit = code => { console.log(new Error().stack); process.exit(code);  }

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message:error.message 
        }
    });
});

module.exports = app;           