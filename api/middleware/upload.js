import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "uploads/");
  // },
  destination: (req, file, cb) => {
  console.log("Saving file to uploads/");
  cb(null, "uploads/");
},
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + path.extname(file.originalname));
  // },
  filename: (req, file, cb) => {
  console.log(file.originalname);
  cb(null, Date.now() + path.extname(file.originalname));
},
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3 MB
  },
});

export default upload;
