import User from "../models/userModel.js";
import asynchandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/index.js";
import generateToken from "../utils/generateToken.js";

/***************************************
 * @desc Auth user and get token
 * @route POST /api/users/login
 * @access Public
 *
 ***************************************/

export const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // generte token
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid email or password");
  }
});

/***************************************
 * @desc Register User
 * @route POST /api/users/login
 * @access Public
 *
 ***************************************/

export const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // check if user exists

  if (userExists) {
    res.status(400); // bad request
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password }); // create user

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      // created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
/***************************************
 * @desc Logout / clear cookie
 * @route POST /api/users/logout
 * @access Private
 *
 ***************************************/

export const logoutUser = asynchandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: CONFIG.NODE_ENV === "production" ? true : false, // set true only in production mode because https is required
    sameSite: "strict",
  });
  res.status(200).json({ msg: "Logout user" });
});

/***************************************
 * @desc Get user profile
 * @route POST /api/users/profile
 * @access Private
 *
 ***************************************/

export const getUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/***************************************
 * @desc UPDATE user profile
 * @route UPDATE /api/users/profile/
 * @access Private
 *
 ***************************************/

export const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      // created
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/***************************************
 * @desc get all users
 * @route GET /api/users
 * @access Private / Admin
 *
 ***************************************/

export const getUsers = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Get users / admin" });
});
/***************************************
 * @desc Get user byi id
 * @route GET /api/users/:id
 * @access Private / Admin
 *
 ***************************************/

export const getUserById = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Get users by id / admin" });
});

/***************************************
 * @desc Update user
 * @route PUT /api/users/:id
 * @access Private / Admin
 *
 ***************************************/

export const updateUser = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Update user/ admin" });
});

/***************************************
 * @desc Delete user
 * @route DELETE /api/users/:id
 * @access Private / Admin
 *
 ***************************************/

export const deleteUser = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Delete users / admin" });
});
