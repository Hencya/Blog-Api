const express = require('express');

const router = express.Router();

const productsController = require('../controller/products');

router.post('/product', productsController.createProduct);
router.get('/products', productsController.getAllProducts);

module.exports = router;
