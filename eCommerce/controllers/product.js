const Category = require('../models/category.model');
const Product = require('../models/product.model');

module.exports = {
  index: async (req, res, next) => {
      const product = await Product.find({});
      res.status(200).json(product);
  },

  newProduct: async (req, res, next) => {
    //Find the category
    const category = await Category.findById(req.value.body.category);

    //Create a new product
    const newProduct = req.value.body;
    delete newProduct.category;

    const product = new Product(newProduct);
    product.category = category;
    await product.save();

    //Add newly created product to the category
    category.products.push(product);
    await category.save();

    res.status(200).json(car);
  },

  getProduct: async(req, res, next) => {
    const { productID } = req.value.params;
    const product = await Product.findById(productID);
    res.status(200).json(product);
  },

  replaceCategory: async(req, res, next) => {
    const { productID } = req.value.params;
    const newProduct = req.value.body;
    result = await Product.findByIdAndUpdate(productID, newProduct);
    res.status(200).json({ success: true });
  },

  updateCategory: async(req, res, next) => {
    const { productID } = req.value.params;
    const newProduct = req.value.body;
    result = await Product.findByIdAndUpdate(productID, newProduct);
    res.status(200).json({ success: true });
  }

}
