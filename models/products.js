const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'product.js');

const getDataFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      return callback(JSON.parse(fileContent))
    }
    callback([]);
  })
}

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  save() {
    getDataFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static fetchAll(callback) {
    getDataFromFile(callback)
  }
}