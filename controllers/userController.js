const userModel = require("../models/useModel");
const bcrypt = require("bcrypt");

//create user register user
exports.registerController = async (req, resp) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //existing user
    const existingUSer = await userModel.findOne({ email });
    if (existingUSer) {
      return resp.status(401).send({
        success: false,
        message: "User already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //save new users
    const user = await new userModel({
      userName,
      email,
      password: hashedPassword,
    }).save();
    return resp.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      message: "Error in Register Callback",
      success: false,
      error,
    });
  }
};

//get all users
exports.getAllUser = async (req, resp) => {
  try {
    const users = await userModel.find({});
    return resp.status(200).send({
      userCount: users.length,
      success: true,
      message: "All User Data",
      users,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      message: "Error in Getting all users",
      success: false,
      error,
    });
  }
};

//create a login user
exports.loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Please Provide email and password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.status(200).send({
        success: false,
        message: "email is not Registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        message: "invalid Username or Password",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      message: "Error in Login Callback",
      success: false,
      error,
    });
  }
};
