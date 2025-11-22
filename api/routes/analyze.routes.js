const express = require("express");
const { analyze } = require("../controllers/analyze.controller.js");

const router = express.Router();

// POST /api/analyze
router.post("/", analyze);

module.exports = router;
