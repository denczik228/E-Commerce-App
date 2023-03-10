const express = require('express');
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  updateUser,
  delUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logOut,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logOut);
router.get('/all', getAllUser);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', delUser);
router.put('/update-password', authMiddleware, updatePassword);
router.put('/update',authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware,isAdmin, unblockUser);


module.exports = router;