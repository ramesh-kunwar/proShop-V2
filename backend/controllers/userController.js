import User from "../models/userModel.js";
import asynchandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/index.js";

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
    const token = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET, {
      expiresIn: "30d",
    });

    // set jwt as httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === "production" ? true : false, // set true only in production mode because https is required
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
    });

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
  res.status(200).json({ msg: "Register user" });
});
/***************************************
 * @desc Logout / clear cookie
 * @route POST /api/users/logout
 * @access Private
 *
 ***************************************/

export const logoutUser = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Logout user" });
});

/***************************************
 * @desc Get user profile
 * @route POST /api/users/profile
 * @access Private
 *
 ***************************************/

export const getUserProfile = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "Get user profile" });
});

/***************************************
 * @desc UPDATE user profile
 * @route UPDATE /api/users/profile/
 * @access Private
 *
 ***************************************/

export const updateUserProfile = asynchandler(async (req, res) => {
  res.status(200).json({ msg: "update user profile" });
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
