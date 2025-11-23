require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.route.js");
const commentRoutes = require("./routes/comment.routes.js");
const summaryRoutes = require("./routes/summary.route.js");
const analyzeRoutes = require("./routes/analyze.routes.js");
const gdeltRoutes = require("./routes/gdelt.routes.js");
const cookieParser = require("cookie-parser");
const path = require("path");

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => console.log("mongo db is connected"))
  .catch((err) => console.log(err));

//const __dirname = path.resolve();
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
// to integrate open ai api
app.use(cors());
// to use json format for input of the backend
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/gdelt", gdeltRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
