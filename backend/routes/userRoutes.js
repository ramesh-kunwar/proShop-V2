import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";


const router = express.Router();

router.route("/").get(getUsers).post(registerUser);

router.route("/logout").post(logoutUser);
router.route("/login").post(authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
