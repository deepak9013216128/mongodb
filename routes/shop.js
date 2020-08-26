const express = require('express');
const path = require('path')

const rootDir = require('../utils/path');
const admin = require('../routes/admin')

const router = express();


router.get('/', (req, res, next) => {
  console.log(admin.products)
  res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = router;