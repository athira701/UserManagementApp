import express from "express";
import {
  adminLogin,
  deleteUser,
  getAllUsers,
  searchUsers,
  createUser,
  updateUser,
} from "../controllers/adminController";
import { verifyAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/admin/login", adminLogin);

router.get("/admin/users", verifyAdmin, getAllUsers);
router.get("/admin/users/search", verifyAdmin, searchUsers);
router.post("/admin/users", verifyAdmin, createUser);

router.put("/admin/users/:id", verifyAdmin, updateUser);
router.delete("/admin/users/:id", verifyAdmin, deleteUser);

export default router;
