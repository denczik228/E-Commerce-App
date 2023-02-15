const BlogCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMonDBid");

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json({ status: "new blog category was created", newCategory });
  } catch (error) {
    throw new error(error);
  }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const delCat = await BlogCategory.findByIdAndDelete(id);
    res.json({
      status: `blog category - ${delCat.title} was deleted`,
      delCat,
    });
  } catch (error) {
    throw new error(error);
  }
});

const allBlogCategories = asyncHandler(async (req, res) => {
  try {
    const getAllCat = await BlogCategory.find();
    res.json({
      status: `all of blog categories:`,
      getAllCat,
    });
  } catch (error) {
    throw new error(error);
  }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updCat = await BlogCategory.findByIdAndUpdate(
      id,
      { title: req?.body?.title },
      { new: true }
    );
    res.json({
      status: `blog category title of id - ${updCat.id} was updated`,
      updCat,
    });
  } catch (error) {
    throw new error(error);
  }
});

const getBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findCat = await BlogCategory.findById(id);
    res.json({
      status: `blog category was found`,
      findCat,
    });
  } catch (error) {
    throw new error(error);
  }
});

module.exports = {
  createBlogCategory,
  deleteBlogCategory,
  allBlogCategories,
  updateBlogCategory,
  getBlogCategory,
};
