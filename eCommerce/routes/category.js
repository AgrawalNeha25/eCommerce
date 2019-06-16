const express = require ('express');
//const router = express.Router();
const router = require('express-promise-router')();

const categoryController = require('../controllers/category');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

//Get all the categories and Post new categories
router.route('/')
  .get(categoryController.index)
  .post(validateBody(schemas.categorySchema), categoryController.newCategory);


router.route('/:categoryID')
  //Get particular category with id
  .get(validateParam(schemas.idSchema, 'categoryID'), categoryController.getCategory)

  //replace particular category with id
  .put([validateParam(schemas.idSchema, 'categoryID'),
      validateBody(schemas.categorySchema)],
      categoryController.replaceCategory)

  //update particular category with id
  .patch([validateParam(schemas.idSchema, 'categoryID'),
        validateBody(schemas.categoryOptionalSchema)],
        categoryController.updateCategory);

router.route('/:categoryID/products')
  //Get the products of particular cartegory id
  .get(validateParam(schemas.idSchema, 'categoryID'),categoryController.getCategoryProducts)

  //Add new product to the particular category
  .post([validateParam(schemas.idSchema, 'categoryID'),
        validateBody(schemas.productSchema)],
        categoryController.newCategoryProduct);


module.exports = router;
