const express = require("express");
const {
  create,
  getPosts,
  deletepost,
  updatepost,
  bookmarkPost,
  getMyBookmarks,
} = require("../controllers/post.controller.js");
const verifyToken = require("../utils/verifyUser.js");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
router.put("/bookmarkpost/:postId", verifyToken, bookmarkPost);
router.get("/mybookmarks/:userId", verifyToken, getMyBookmarks);

module.exports = router;
