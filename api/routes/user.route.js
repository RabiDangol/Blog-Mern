import express from "express";
import upload from "../middleware/upload.js";
import { test, uploadProfileImage } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);

// Upload profile image
router.post("/upload", upload.single("image"), uploadProfileImage);

router.get("/test", test);

export default router;
