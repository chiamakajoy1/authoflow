const bcrypt = require("bcrypt");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

const createHospital = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Check existing hospital
    const existingHospital = await Hospital.findOne({
      where: { email },
    });

    if (existingHospital) {
      return res.status(409).json({
        success: false,
        message: "A hospital with this email already exists",
      });
    }

    // Create hospital
    const hospital = await Hospital.create({
      name,
      email,
      phone,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      hospital,
    });
  } catch (error) {
    console.error("Create hospital error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const createHospitalUser = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    // Check hospital
    const hospital = await Hospital.findByPk(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create hospital user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "HOSPITAL",
      hospitalId: hospital.id,
    });

    return res.status(201).json({
      success: true,
      message: "Hospital user created successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        hospitalId: user.hospitalId,
      },
    });
  } catch (error) {
    console.error("Create hospital user error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createHospital,
  createHospitalUser,
};
