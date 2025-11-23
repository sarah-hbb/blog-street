async function fetchGdeltArticles(topic) {
  if (!topic) throw new Error("Topic is required");

  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(
    topic
  )}&mode=artlist&format=json&maxrecords=250`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GDELT API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

const getGdeltArticles = async (req, res, next) => {
  try {
    const topic = req.query.topic;
    const data = await fetchGdeltArticles(topic);

    res.status(200).json({
      articles: data.articles,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGdeltArticles };
