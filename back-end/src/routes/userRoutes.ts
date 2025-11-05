import express from "express";
import upload from "../middlewares/uploadMiddleware";
import {
  registerUser,
  loginUser,
  uploadProfileImage,
  updateProfile,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post(
  "/uploadProfileImage",
  verifyToken,
  upload.single("profileImage"),
  uploadProfileImage
);
router.post("/update-profile", verifyToken, updateProfile);

export default router;
