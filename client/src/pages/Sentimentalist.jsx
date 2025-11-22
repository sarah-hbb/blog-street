import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import NeonButton from "../components/ui/NeonButton";

const Sentimentalist = () => {
  const [topic, setTopic] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch articles from GDELT API based on topic and analyze with OpenAI

  const fetchAndAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      // 1️⃣ Fetch GDELT articles
      const res = await fetch(
        `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(
          topic
        )}&mode=artlist&format=json`
      );
      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        setError("No articles found for this topic");
        setLoading(false);
        return;
      }

      setArticles(data.articles);

      // 2️⃣ Combine all titles
      const titlesText = data.articles
        .map((article, i) => `${i + 1}. ${article.title}`)
        .join("\n");

      // 3️⃣ Send to backend for OpenAI analysis
      const analysisRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: titlesText }),
      });

      if (!analysisRes.ok) throw new Error("Failed to analyze");

      const analysisData = await analysisRes.json();
      setAnalysis(analysisData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

  // Prepare data for Recharts
  const sentimentData = analysis?.sentiment
    ? Object.entries(analysis.sentiment).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const biasData = analysis?.bias
    ? Object.entries(analysis.bias).map(([label, value]) => ({ label, value }))
    : [];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"]; // positive, neutral, negative
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Media Sentiment Analyzer</h1>

      {/* Form */}
      <form onSubmit={fetchAndAnalyze} className="mb-6">
        <input
          type="text"
          placeholder="Enter topic..."
          className="border p-2 w-full mb-6"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <NeonButton type="submit" disabled={loading} className="mb-20">
          {loading ? "Analyzing…" : "Fetch & Analyze"}
        </NeonButton>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {/* Articles list (optional) */}
      {articles.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Fetched Articles</h2>
          <ul className="list-disc ml-5">
            {articles.slice(0, 5).map((a, i) => (
              <li key={i}>{a.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Charts */}
      {analysis && (
        <div className="space-y-10">
          {/* Sentiment Pie Chart */}
          {sentimentData.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Sentiment</h2>
              <PieChart width={350} height={300}>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {sentimentData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          )}

          {/* Bias Bar Chart */}
          {biasData.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Media Bias</h2>
              <BarChart width={350} height={300} data={biasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sentimentalist;
