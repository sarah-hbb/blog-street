const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSentiment = async (titlesText) => {
  if (!titlesText) throw new Error("No text provided to analyze");

  const prompt = `
You are an expert media analyst.

Analyze the following NEWS HEADLINES about a topic:

${titlesText}

Provide a JSON response with:
{
  "sentiment": { "positive": %, "negative": %, "neutral": % },
  "bias": "overall political or narrative bias",
  "top_themes": ["...", "..."],
  "summary": "short description of media stance"
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    throw new Error("OpenAI analysis failed: " + err.message);
  }
};
module.exports = { analyzeSentiment };
