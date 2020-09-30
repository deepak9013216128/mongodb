const getDb = require('../utils/database').getDb;
class Product {
  constructor(id, title, imageUrl, price, description) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  save() {
    const db = getDb()
    return db.collection('products')
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

}

module.exports = Product;