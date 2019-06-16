const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return(req, res, next) => {
      const result = Joi.validate({ param: req['params'][name]}, schema);
      if(result.error){
        return res.status(400).json(result.error);
      }else{
        if(!req.value)
          req.value = {};

        if(!req.value['params'])
          req.value['params'] = {};

        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if(result.error){
        return res.status(400).json(result.error);
      }else{
        if(!req.value)
          req.value = {};

        if(!req.value['body'])
          req.value['body'] = {};

        req.value['body'] = result.value;
        next();
      }
    }
  },

  schemas: {
    categorySchema: Joi.object().keys({
      name: Joi.string().required(),
      subCategories: Joi.array().required()
    }),
    categoryOptionalSchema: Joi.object().keys({
      name: Joi.string(),
      subCategories: Joi.array()
       }),
    categoryProductSchema: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      brand: Joi.string().required(),
      modelNumber: Joi.string().required()
    }),
    productSchema: Joi.object().keys({
      category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      brand: Joi.string().required(),
      modelNumber: Joi.string().required()
    }),
    productOptionalSchema:Joi.object().keys({
      name: Joi.string(),
      price: Joi.number(),
      brand: Joi.string(),
      modelNumber: Joi.string()
    }),
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
}
