const path = require('path')
const fs = require('fs')

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {

  static addProduct(id, price) {

    //Fetch the privous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      //Analyze the product => find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      //Add new product / increase the quantity
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct }
        updateProduct.qty = updateProduct.qty + 1;
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id, qty: 1 }
        cart.products = [...cart.products, updateProduct]
      }

      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err)
      })
    })
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return callback(null)
      }
      return callback(JSON.parse(fileContent))
    })
  }
}