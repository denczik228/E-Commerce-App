const Coupon = require('../models/couponModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMonDBid");

const createCoupon = asyncHandler(async (req, res) => {
   try {
       const newCoupon = await Coupon.create(req.body);
       res.json({ msg:`New coupon - ${newCoupon.name} was created`,newCoupon })
   } catch (error) {
       throw new error(error);
   } 
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const couponChanges = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ msg: `coupon - ${couponChanges.name} was modify`, couponChanges });
} catch (error) {
    throw new error(error);
}
});

const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const getCoupons = await Coupon.find();
        res.json({ msg: `all created coupons:`, getCoupons });
    } catch (error) {
        throw new error(error)
    }
});

const getCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findCoupon = await Coupon.findById(id);
        res.json({ msg: `coupon - ${findCoupon.name} was found`, findCoupon });
    } catch (error) {
        throw new error(error);
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const delCoup = await Coupon.findByIdAndDelete(id);
        res.json({ msg: `coupon was deleted - ${delCoup.name}`, delCoup })
    } catch (error) {
        throw new error(error);
    }
});

module.exports = { createCoupon, updateCoupon, getAllCoupons, getCoupon, deleteCoupon };