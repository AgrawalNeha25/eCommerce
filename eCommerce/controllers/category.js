const Category = require('../models/category.model');
const Product = require('../models/product.model');




module.exports = {
  index: async (req, res, next) => {
      const category = await Category.find({});
      res.status(200).json(category);
  },

  newCategory: async(req, res, next) => {
      const newCategory = new Category(req.value.body);
      const category = await newCategory.save();
      res.status(201).json(category);
  },

  getCategory: async(req,res, next) => {
    const { categoryID } = req.value.params;
    const category = await Category.findById(categoryID);
    res.status(200).json(category);
  },


  replaceCategory: async(req, res, next) => {
    const { categoryID } = req.value.params;
    const newCategory = req.value.body;
    result = await Category.findByIdAndUpdate(categoryID, newCategory);
    res.status(200).json({ success: true });
  },

  updateCategory: async(req, res, next) => {
    const { categoryID } = req.value.params;
    const newCategory = req.value.body;
    result = await Category.findByIdAndUpdate(categoryID, newCategory);
    res.status(200).json({ success: true });
  },

  getCategoryProducts:async(req, res, next) => {
    const { categoryID } = req.value.params;
    const category = await Category.findById(categoryID).populate('products');
    res.status(200).json(category.products);
  },

  newCategoryProduct: async(req, res, next) => {
    const { categoryID } = req.value.params;
    //create a new product
    const newProduct = new Product(req.value.body);
    //get category
    const category = await Category.findById(categoryID);
    //assign category as product's category
    newProduct.category = category;
    //save the product
    await newProduct.save();
    //Add product to category's product array
    category.products.push(newProduct);
    //save category
    await category.save();
    console.log('category',category);
    res.status(201).json(newProduct);
  }
};
