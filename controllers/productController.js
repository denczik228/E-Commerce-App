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
})

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
})

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (error) {
        throw new error(error);
    }
})

module.exports = { createProduct, getProduct, getAllProducts, updateProduct };
