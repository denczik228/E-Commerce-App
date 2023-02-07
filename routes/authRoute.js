const express = require('express');
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  updateUser,
  delUser,
} = require("../controllers/userController");
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all', getAllUser);
router.get('/:id', getUser);
router.delete('/:id', delUser);
router.put('/:id', updateUser);

module.exports = router;