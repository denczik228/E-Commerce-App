const express = require('express');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
} = require("../controllers/productController");
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.post('/:id', getProduct);
router.put('/update/:id', authMiddleware, isAdmin,  updateProduct);
router.get('/allproducts', getAllProducts);
router.delete('/delete-product/:id', authMiddleware, isAdmin, deleteProduct);
router.put('/add-to-wishlist', authMiddleware, addToWishList);

module.exports = router;