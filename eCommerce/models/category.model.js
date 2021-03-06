const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  subCategories: [{ name: String }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
});

const Category = mongoose.model('category', categorySchema );
module.exports = Category;
