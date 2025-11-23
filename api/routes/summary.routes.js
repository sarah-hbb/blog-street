const express = require("express");
const createSummary = require("../controllers/summary.controller.js");
const verifyToken = require("../utils/verifyUser.js");

const router = express.Router();

router.post("/create", verifyToken, createSummary);

module.exports = router;
