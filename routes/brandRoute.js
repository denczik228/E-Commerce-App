const express = require('express');
const { updateBrand, getBrand, deleteBrand, allBrands, createBrand } = require('../controllers/brandController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put(
  "/update-brand/:id",
  authMiddleware,
  isAdmin,
  updateBrand
);
router.get("/all-brands", allBrands);
router.post(
  "/find-brand/:id",
  authMiddleware,
  isAdmin,
  getBrand
);
router.delete(
  "/delete-brand/:id",
  authMiddleware,
  isAdmin,
  deleteBrand
);

module.exports = router;