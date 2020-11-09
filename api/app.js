const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const marketRoutes = require('./api/routes/market');
const searchRoutes = require('./api/routes/search');
const cartRoutes = require('./api/routes/cart');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*"); // change later
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/market', marketRoutes);
app.use('/search', searchRoutes);
app.use('/cart', cartRoutes);

// sample code to create static filepath
// app.use('/uploads', express.static('img'));

app.use('/uploads', express.static('uploads'));
// app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message 
        }
    });
});

module.exports = app;