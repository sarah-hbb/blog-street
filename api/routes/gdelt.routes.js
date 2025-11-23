const express = require("express");
const router = express.Router();
const { getGdeltArticles } = require("../controllers/gdelt.controller");

// GET /api/gdelt?topic=...
router.get("/", getGdeltArticles);

module.exports = router;
