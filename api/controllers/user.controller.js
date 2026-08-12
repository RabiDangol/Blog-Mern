import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
    });
    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No image uploaded",
    //   });
    // }

    // const { userId } = req.body;

    // if (!userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User ID is required",
    //   });
    // }

    // const imageUrl = `/uploads/${req.file.filename}`;

    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     profilePicture: imageUrl,
    //   },
    //   { new: true },
    // );

    // if (!updatedUser) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   message: "Profile image uploaded successfully",
    //   imageUrl: imageUrl,
    //   user: updatedUser,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
