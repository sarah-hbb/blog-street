const OpenAI = require("openai");
const errorHandler = require("../utils/error");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createSummary = async (req, res, next) => {
  if (!req.user.isAdmin) return;
  const { topic } = req.body;
  try {
    if (!topic) {
      return next(errorHandler(400, "Topic is required"));
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates concise summaries.",
        },
        {
          role: "user",
          content: `Generate a concise summary (minmum 200 words) about the following topic: ${topic}`,
        },
      ],
    });

    res.status(200).json({ summary: completion.choices[0].message.content });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    next(error);
  }
};

module.exports = createSummary;
