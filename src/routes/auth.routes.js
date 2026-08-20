const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.get(
  "/hospital-test",
  authenticate,
  authorize("HOSPITAL"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "You are a hospital user",
      user: req.user,
    });
  }
);

router.get(
  "/insurance-test",
  authenticate,
  authorize("INSURANCE"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "You are an insurance user",
      user: req.user,
    });
  }
);

module.exports = router;