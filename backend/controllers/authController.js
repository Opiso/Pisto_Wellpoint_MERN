require("dotenv").config();
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const [devURL, prodURL] = process.env.FRONTEND_URLS.split(",");
    const baseURL = process.env.NODE_ENV === "development" ? devURL : prodURL;
    const resetURL = `${baseURL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click here to reset your password: ${resetURL}`
    );

    res
      .status(200)
      .send({ message: "Password reset email sent", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Failed to process password reset", success: false });
  }
};

module.exports = { forgotPassword };
