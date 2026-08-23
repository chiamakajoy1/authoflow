require("dotenv").config();

const bcrypt = require("bcrypt");
const { User } = require("../models");

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: {
        email: "admin@insurance.com",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "Admin123!",
      10
    );

    await User.create({
      fullName: "Insurance Administrator",
      email: "admin@insurance.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin created successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();