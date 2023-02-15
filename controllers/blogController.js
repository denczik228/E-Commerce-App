const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMonDBid");

const createBlog = asyncHandler(async (req, res) => { 
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "success",
            newBlog,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updBlg = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
          new: true,
        });
        res.json({
          status: "succesfully updated",
          updBlg,
        });
    } catch (error) {
        throw new error(error)
    }
});

const allBlogs = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.json({
      status: "all blogs:",
      getAllBlogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const findBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findBlg = await Blog.findById(id)
          .populate("likes")
          .populate("dislikes");
        //console.log(findBlg);
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true }
        );
        res.json({
            status: "blog was found:",
            findBlg,
            updateViews
        });
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const delBlog = await Blog.findByIdAndDelete(id);
        console.log(delBlog);
        res.json({
            status: "blog was succesfully deleted",
            delBlog
        });
    } catch (error) {
        throw new error(error);
    }
});

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    const blog = await Blog.findById( blogId );
    //checking if user logged in
    const loginUserId = req?.user?._id;
    //console.log(loginUserId);
    //if user liked this blog
    const isLiked = blog?.isLiked;
    //if user dislike this blog
    const isDisLiked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString());
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisLiked: false,
        },
            { new: true }
        );
        res.json(blog);
    };
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: loginUserId },
            isLiked: false,
          },
          { new: true }
        );
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: loginUserId },
            isLiked: true,
          },
          { new: true }
        );
        res.json(blog);
    }
});
 
const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  //checking if user logged in
  const loginUserId = req?.user?._id;
  //console.log(loginUserId);
  //if user liked this blog
  const isDisLiked = blog?.isDisLiked;
  //if user dislike this blog
  const isLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

module.exports = { createBlog, updateBlog,allBlogs,findBlog,deleteBlog,likeBlog, disLikeBlog };