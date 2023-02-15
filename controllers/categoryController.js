const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMonDBid");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json({ status:'new category was created', newCategory });
    } catch (error) {
        throw new error(error);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const delCat = await Category.findByIdAndDelete(id);
        res.json({
        status: `category - ${delCat.title} was deleted`,
        delCat});
    } catch (error) {
        throw new error(error);
    }
});

const allCategories = asyncHandler(async (req, res) => {
    try {
        const getAllCat = await Category.find();
        res.json({
          status: `all categories:`,
          getAllCat,
        });
    } catch (error) {
        throw new error(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updCat = await Category.findByIdAndUpdate(id, { title: req?.body?.title }, { new: true });
        res.json({
          status: `category title of id - ${updCat.id} was updated`,
          updCat,
        });
   } catch (error) {
    throw new error(error);
   } 
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findCat = await Category.findById(id);
        res.json({
          status: `category was found`,
          findCat,
        });
    } catch (error) {
        throw new error(error);
    }
});

module.exports = { createCategory, deleteCategory, allCategories,updateCategory, getCategory };