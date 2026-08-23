const express = require("express");

const {
  createHospital,
  createHospitalUser,
} = require("../controllers/hospitalController");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createHospital
);

router.post(
  "/:hospitalId/users",
  authenticate,
  authorize("ADMIN"),
  createHospitalUser
);

module.exports = router;