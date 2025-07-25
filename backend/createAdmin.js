const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("MONGO_URI:", process.env.M0NGO_URL);

    await mongoose.connect(process.env.M0NGO_URL);

    const existingAdmin = await User.findOne({ email: "capisokoth@gmail.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      fname: "Admin",
      email: "capisokoth@gmail.com",
      password: hashedPassword,
      isAdmin: true,
      lname: "Admin",
      profilePicture: "",
      gender: "Male",
      isDoctor: false,
      isBlocked: false ,
      seenNotifications:  [],
      unseenNotifications:  [],
    });

    await adminUser.save();
    console.log("✅ Admin user created");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
    process.exit(1);
  }
};

createAdmin();
