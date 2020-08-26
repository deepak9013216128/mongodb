const express = require('express');
const path = require('path')

const rootDir = require('../utils/path');
const admin = require('../routes/admin')

const router = express();


router.get('/', (req, res, next) => {
  const { products } = admin;
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' })
})

module.exports = router;