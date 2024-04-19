const blogModel = require("../models/blogModel");
const userModel = require("../models/useModel");
const mongoose = require("mongoose");
//GET All Blogs
exports.getAllBlogController = async (req, resp) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return resp.status(200).send({
        success: false,
        message: "no Blog Found",
      });
    }
    return resp.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs Lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error While getting Blogs",
      error,
    });
  }
};

//Create blog
exports.createBlogController = async (req, resp) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return resp.status(400).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return resp.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = await new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return resp.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error While Creating Blogs",
      error,
    });
  }
};
//update blog

exports.updateBlogController = async (req, resp) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return resp.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error While updating Blogs",
      error,
    });
  }
};
//single Blog
exports.getBlogByIdController = async (req, resp) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return resp.status(404).send({
        success: false,
        message: "no Blog Found with this id",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error While getting single Blogs",
      error,
    });
  }
};

//delete blog
exports.deleteBlogController = async (req, resp) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return resp.status(200).send({
      success: true,
      message: " Blog deleted successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error While deleting  Blogs",
      error,
    });
  }
};

//GET user blog
//this is used to find the blogs of user whose id is present in blogs collections

exports.userBlogController = async (req, resp) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs"); //here if populate is not present then only id of blogs comes not his details
    if (!userBlog) {
      return resp.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in user Blogs",
      error,
    });
  }
};
