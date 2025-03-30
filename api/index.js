const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.route.js");
const commentRoutes = require("./routes/comment.routes.js");
const summaryRoutes = require("./routes/summary.route.js");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

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

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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
