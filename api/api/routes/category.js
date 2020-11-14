const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
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

router.get('/', CategoryController.categories_get_all_and_products); // open

router.post('/', upload.fields([{name:'categoryImage',maxCount:1}]), checkAuth, CategoryController.categories_create_category); // admin

router.get('/:categoryId', CategoryController.categories_get_category_and_products); // open

router.get('/related/:categoryId/:productId', CategoryController.categories_get_related_products_except_current);

router.patch('/:categoryId', upload.fields([{name:'categoryImage',maxCount:1}]), checkAuth, CategoryController.categories_update_category); // admin

router.delete('/:categoryId', checkAuth, CategoryController.categories_delete_category); // admin

router.get('/m/fix', CategoryController.products_fix);

module.exports = router;