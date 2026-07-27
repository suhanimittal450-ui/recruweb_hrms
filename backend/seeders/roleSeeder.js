const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");
const Role = require("../models/auth/Role");

const roles = [
  {
    name: "SUPER_ADMIN",
    description: "Super Administrator (full system access)",
  },
  {
    name: "ADMIN",
    description: "System Administrator",
  },
  {
    name: "HR",
    description: "Human Resource",
  },
  {
    name: "MANAGER",
    description: "Reporting Manager",
  },
  {
    name: "TEAM_LEAD",
    description: "Team Lead",
  },
  {
    name: "EMPLOYEE",
    description: "Employee",
  },
  {
    name: "RECRUITER",
    description: "Recruitment Team",
  },
  {
    name: "ACCOUNTANT",
    description: "Accounts / Payroll Team",
  },
];

const seedRoles = async () => {
  try {
    await connectDB();

    await Role.deleteMany();

    await Role.insertMany(roles);

    console.log("✅ Roles Seeded Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedRoles();
