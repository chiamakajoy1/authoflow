const express = require("express");

const {
  createPatient,
  getPatients,
  getPatientById,
} = require("../controllers/patientController");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("HOSPITAL"),
  createPatient
);

router.get(
  "/",
  authenticate,
  authorize("HOSPITAL"),
  getPatients
);

router.get(
  "/:id",
  authenticate,
  authorize("HOSPITAL"),
  getPatientById
);

module.exports = router;