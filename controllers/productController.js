const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMonDBid');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new error(error)
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    validateMongoDbId(id);
    try {
        if (req.body.title) {
        req.body.slug = slugify(req.body.title);
        }
        //console.log(req.body);
        const updatedPr = await Product.findByIdAndUpdate(
            { _id: id },
          req.body,
          {
            new: true,
          }
        );
        res.json(updatedPr);
    } catch (error) {
        throw new Error(error);
    }
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new error(error)
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    //console.log(req.query);
    try {
        let queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj(el));
        console.log(queryObj);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        const query = Product.find(JSON.parse(queryStr));
        const allProducts = await query;
        res.json(allProducts);
    } catch (error) {
        throw new error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const delProd = await Product.findByIdAndDelete(id);
        res.json(delProd);
    } catch (error) {
        throw new Error(error);
    }

});



module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct };
