const { analyzeSentiment } = require("../models/analyze.model.js");
const errorHandler = require("../utils/error.js");

const analyze = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      retun(next(errorHandler(400, "Text is required for analysis")));
    }
    const result = await analyzeSentiment(text);
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { analyze };
