const express = require("express");
const { createBlogCategory, updateBlogCategory, allBlogCategories, getBlogCategory, deleteBlogCategory } = require("../controllers/blogCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/update-category-blog/:id", authMiddleware, isAdmin, updateBlogCategory);
router.get("/all-category-blogs", allBlogCategories);
router.post("/find-category-blog/:id", authMiddleware, isAdmin, getBlogCategory);
router.delete("/delete-category-blog/:id", authMiddleware, isAdmin, deleteBlogCategory);

module.exports = router;
