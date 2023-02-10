const express = require('express');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post('/', createProduct);
router.post('/:id', getProduct);
router.put('/update/:id', updateProduct);
router.get('/allproducts', getAllProducts);

module.exports = router;