import express from "express";
import upload from "../middleware/upload.js";
import {
  test,
  uploadProfileImage,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);

// Upload profile image
router.post("/upload", upload.single("image"), uploadProfileImage);

export default router;
