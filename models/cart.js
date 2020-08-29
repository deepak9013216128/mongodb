const path = require('path')
const fs = require('fs')

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {

  static addProduct(id, price) {

    //Fetch the privous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { product: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      //Analyze the product => find existing product
      const existingProductIndex = cart.product.findIndex(prod => prod.id === id);
      const existingProduct = cart.product[existingProductIndex];

      //Add new product / increase the quantity
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct }
        updateProduct.qty = updateProduct.qty + 1;
        cart.product[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id, qty: 1 }
        cart.product = [...cart.product, updateProduct]
      }

      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }
}