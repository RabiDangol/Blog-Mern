import express from "express";
import upload from "../middleware/upload.js";
import {
  test,
  uploadProfileImage,
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

//update the profile data
router.put("/update/:userId", verifyToken, updateUser);

// Upload profile image
router.post("/upload", upload.single("image"), uploadProfileImage);

//delete the account
router.delete("/delete/:userId", verifyToken, deleteUser);

//Signout the account
router.post("/signout", signout);

export default router;
