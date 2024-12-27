const express = require('express');
const productController = require('../controllers/product.controller');
const { body } = require('express-validator');
const verifyToken = require('../middleware/auth.middleware');
const { productImage } = require('../middleware/product.images.middleware');

const router = express.Router();
router.use(express.json());

//Create new product
router.post(
  '/', verifyToken, productImage,
  [
    body('productName').isString().notEmpty().withMessage('Product name is required'),
    body('productCategory').isString().notEmpty().withMessage('Product category is required'),
    body('productPrice').isString().notEmpty().withMessage('Product price is required'),
  ],
  productController.createProduct
);


router.get('/', verifyToken, productController.getAllProducts); //Get all products

router.get('/:id', verifyToken, productController.getProductById); //Get one product by id

router.patch('/:id', verifyToken, productController.updateProduct); //Update a product

router.delete('/:id', verifyToken, productController.deleteProduct); //Delete a product

module.exports = router;