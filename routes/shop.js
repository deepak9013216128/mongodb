const express = require('express');

const productController = require('../controllers/products');

const router = express();

router.get('/', productController.getProducts)

module.exports = router;