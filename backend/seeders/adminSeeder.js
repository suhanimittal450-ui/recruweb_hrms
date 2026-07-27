const dotenv = require("dotenv");
const connectDB = require("../config/db");

dotenv.config();

const User = require("../models/auth/User");
const Role = require("../models/auth/Role");

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminRole = await Role.findOne({
      name: "ADMIN",
    });

    if (!adminRole) {
      throw new Error("ADMIN role not found. Run role seeder first.");
    }

    const existing = await User.findOne({
      email: "admin@hrms.com",
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      firstName: "System",
      lastName: "Admin",
      email: "admin@hrms.com",
      phone: "9999999999",
      password: "Admin@123",
      role: adminRole._id,
    });

    console.log("✅ Default Admin Created");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
