const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog", getAllBlogController);

//POST || Create blog
router.post("/create-blog", createBlogController);

//PUT || update-blog

router.put("/update-blog/:id", updateBlogController);

//GET || Single Blog Details

router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog

router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
//this is used to find the blogs of user whose id is present in blogs collections
router.get("/user-blog/:id", userBlogController);
module.exports = router;
