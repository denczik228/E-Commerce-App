const express = require('express');
const { createBlog, updateBlog, allBlogs, findBlog, deleteBlog, likeBlog, disLikeBlog } = require('../controllers/blogController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, isAdmin, createBlog);
router.put("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.get('/all-blogs', allBlogs);
router.post("/find-blog/:id", authMiddleware, isAdmin, findBlog);
router.delete("/delete-blog/:id", authMiddleware, isAdmin, deleteBlog);
router.put('/likes', authMiddleware, isAdmin, likeBlog);
router.put("/dislikes", authMiddleware, isAdmin, disLikeBlog);

module.exports = router;