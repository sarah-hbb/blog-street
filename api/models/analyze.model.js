const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSentiment = async (titlesText) => {
  if (!titlesText) throw new Error("No text provided to analyze");

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }, // ⬅️ Forces strict JSON
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an expert media analyst. Return ONLY valid JSON, no backticks, no code fences.",
        },
        {
          role: "user",
          content: `
Analyze the following news headlines:

${titlesText}

Return ONLY a JSON object with:
{
  "sentiment": { "positive": number, "negative": number, "neutral": number },
  "bias": "short text describing political/narrative bias",
  "top_themes": ["list of themes"],
  "summary": "short summary"
}
          `,
        },
      ],
    });

    // JSON is guaranteed valid now
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    throw new Error("OpenAI analysis failed: " + err.message);
  }
};

module.exports = { analyzeSentiment };
