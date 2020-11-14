const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb) { // cb stands for callback
         cb(null, './uploads/');
    },
     filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + uuid.v4() + "-" + file.originalname); 
    }  
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif' || file.mimetype === 'image/tiff'|| file.mimetype === 'image/raw') {
        cb(null,true);
    } else {
        cb(new Error('Invalid file type'),false);
    }
}

const upload = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 300
    },
    fileFilter
});


router.get('/', checkAuth, ProductController.products_get_all);  // only admin

router.get('/:productId', ProductController.products_get_product); // open

router.get('/random/:limit', ProductController.products_get_random);

router.get('/starred/:limit', ProductController.products_get_starred);

router.post('/', upload.fields([{name:'productImage',maxCount:1}]), checkAuth,  ProductController.products_add_product); // only admin

router.patch('/:productId', upload.fields([{name:'productImage',maxCount:1}]), checkAuth, ProductController.products_update_product); // only admin

router.delete('/:productId', checkAuth, ProductController.products_delete_product); // only admin

// router.get('/m/fix', ProductController.products_fix);

module.exports = router;