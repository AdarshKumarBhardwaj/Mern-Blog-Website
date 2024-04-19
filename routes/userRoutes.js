const express = require("express");
const {
  getAllUser,
  registerController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

//GET all users
router.get("/all-users", getAllUser);

//Create user || POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

module.exports = router;
