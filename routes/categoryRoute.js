const express = require('express');
const { createCategory, deleteCategory, allCategories, updateCategory, getCategory } = require('../controllers/categoryController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin , createCategory);
router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);
router.get('/all-categories', allCategories);
router.put("/update-category/:id", authMiddleware, isAdmin, updateCategory);
router.post('/get-category/:id', authMiddleware, isAdmin, getCategory);

module.exports = router;