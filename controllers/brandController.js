const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMonDBid");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json({ status: "new brand was created", newBrand });
  } catch (error) {
    throw new error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delBrand = await Brand.findByIdAndDelete(id);
    res.json({
      status: `Brand - ${delBrand.title} was deleted`,
      delBrand,
    });
  } catch (error) {
    throw new error(error);
  }
});

const allBrands = asyncHandler(async (req, res) => {
  try {
    const getAllBrands = await Brand.find();
    res.json({
      status: `all Brands:`,
      getAllBrands,
    });
  } catch (error) {
    throw new error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updBrand = await Brand.findByIdAndUpdate(
      id,
      { title: req?.body?.title },
      { new: true }
    );
    res.json({
      status: `Brand - ${updBrand.id} was updated`,
      updBrand,
    });
  } catch (error) {
    throw new error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findBrand = await Brand.findById(id);
    res.json({
      status: `Brand was found`,
      findBrand,
    });
  } catch (error) {
    throw new error(error);
  }
});

module.exports = {
    createBrand,
    getBrand,
    deleteBrand,
    updateBrand,
    allBrands
};
