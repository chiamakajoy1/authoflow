const Patient = require("../models/Patient");

const createPatient = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      insuranceNumber,
      phone,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !dateOfBirth ||
      !gender ||
      !insuranceNumber
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, date of birth, gender and insurance number are required",
      });
    }

    // Get hospital from authenticated user
    const hospitalId = req.user.hospitalId;

    if (!hospitalId) {
      return res.status(400).json({
        success: false,
        message: "User is not associated with a hospital",
      });
    }

    // Create patient
    const patient = await Patient.create({
      fullName,
      dateOfBirth,
      gender,
      insuranceNumber,
      phone,
      hospitalId,
    });

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    console.error("Create patient error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    if (!hospitalId) {
      return res.status(400).json({
        success: false,
        message: "User is not associated with a hospital",
      });
    }

    const patients = await Patient.findAll({
      where: {
        hospitalId,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });
  } catch (error) {
    console.error("Get patients error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospitalId = req.user.hospitalId;

    const patient = await Patient.findOne({
      where: {
        id,
        hospitalId,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    console.error("Get patient error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
};