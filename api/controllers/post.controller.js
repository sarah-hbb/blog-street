const errorHandler = require("../utils/error.js");
const Post = require("../models/post.model.js");

// Create a post
const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Get post (all posts or just one specific post)
const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    });

    const lastMonthPostsCount = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ posts, lastMonthPosts, lastMonthPostsCount, totalPosts });
  } catch (error) {
    next(error);
  }
};

// Delete post
const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("the post has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update post
const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    return next(errorHandler(403, "You are not allowed to update this post"));
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Bookmark/unbookmark a post
const bookmarkPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "post not found!"));
    }
    const currentUserIndex = post.bookmarks.indexOf(req.user.id);
    if (currentUserIndex === -1) {
      post.bookmarks.push(req.user.id);
      post.numberOfBookmarks += 1;
    } else {
      post.bookmarks.splice(currentUserIndex, 1);
      post.numberOfBookmarks -= 1;
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// get the bookmarks that bookmarked by a user
const getMyBookmarks = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are unauthorized to see bookmarks"));
    }
    const bookmarkedPosts = await Post.find({
      bookmarks: { $in: [req.params.userId] },
    });
    res.status(200).json(bookmarkedPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getPosts,
  deletepost,
  updatepost,
  bookmarkPost,
  getMyBookmarks,
};
