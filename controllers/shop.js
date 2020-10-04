const path = require('path');

const rootDir = require('../utils/path');

const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      if (product) {
        return res.render('shop/product-detail', {
          product,
          pageTitle: product.title,
          path: '/products'
        })
      }
      return res.redirect('/products')
    })
    .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products
      })
    })
    .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(result => {
      console.log(result)
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postDeleteCartProduct = (req, res, next) => {

  const { productId } = req.body;
  Product.findById(productId, product => {
    if (product) {
      Cart.deleteProduct(productId, product.price)
      res.redirect('/cart')
    }
  })

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}