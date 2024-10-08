const errorHandler = require("../utils/error.js");
const Comment = require("../models/comment.model.js");

// Create a comment
const createComment = async (req, res, next) => {
  try {
    if (req.user.id !== req.body.userId) {
      return next(errorHandler(403, "you are not allowed to post a comment"));
    }
    const newComment = new Comment({
      content: req.body.content,
      userId: req.body.userId,
      postId: req.body.postId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

// get all comments of a post
const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    })
      .sort({ createdAt: -1 })
      .skip(req.query.startIndex)
      .limit(5);

    const totalComments = await Comment.find({
      postId: req.params.postId,
    }).countDocuments();

    res.status(200).json({ comments, totalComments });
  } catch (error) {
    next(error);
  }
};

// handle like/unlike a comment
const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const currentUserIdIndex = comment.likes.indexOf(req.user.id);
    // when current user has not liked the comment yet: like
    if (currentUserIdIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      // when cuurent user already liked the comment: unlike
      comment.numberOfLikes -= 1;
      comment.likes.splice(currentUserIdIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

// delete a comment
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "comment not found"));
    }

    if (req.user.id !== comment.userId && !req.user.isAdmin) {
      return next(
        errorHandler(404, "You are not allowed to delete this comment.")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

// edit a comment
const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "comment not found"));
    }
    if (req.user.id !== comment.userId) {
      return next(
        errorHandler(404, "You are not allowed to edit this comment.")
      );
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },

      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getPostComments,
  likeComment,
  deleteComment,
  editComment,
};
