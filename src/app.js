const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/",(req,res)=> {
    res.status(200).json({
        success: true,
        message: "Health Insurance API is running!",
    });
});

module.exports = app;