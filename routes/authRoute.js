const express = require('express');
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  updateUser,
  delUser,
  unblockUser,
  blockUser
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all', getAllUser);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', delUser);
router.put('/update',authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin, unblockUser);

module.exports = router;