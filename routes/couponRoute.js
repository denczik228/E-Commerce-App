const express = require('express');
const { createCoupon, updateCoupon, getAllCoupons, deleteCoupon, getCoupon } = require('../controllers/couponController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-coupon', authMiddleware, isAdmin, createCoupon);
router.put('/update-coupon/:id', authMiddleware, isAdmin, updateCoupon);
router.get('/all-coupons', authMiddleware, isAdmin, getAllCoupons);
router.delete('/delete-coupon/:id', authMiddleware, isAdmin, deleteCoupon);
router.post('/get-coupon/:id', authMiddleware, isAdmin, getCoupon);

module.exports = router;