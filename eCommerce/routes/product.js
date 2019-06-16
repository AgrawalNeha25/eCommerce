const router = require('express-promise-router')();
const productController = require('../controllers/product');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(productController.index)
  .post(validateBody(schemas.productSchema), categoryController.newProduct);

router.route('/:productID')
  //Get particular category with id
  .get(validateParam(schemas.idSchema, 'productID'), categoryController.getPeoduct)

  //replace particular category with id
  .put([validateParam(schemas.idSchema, 'productID'),
      validateBody(schemas.categoryProductSchema)],
      productController.replaceProduct)

  //update particular category with id
  .patch([validateParam(schemas.idSchema, 'productID'),
        validateBody(schemas.productOptionalSchema)],
        productController.updateProduct);

module.exports = router;
