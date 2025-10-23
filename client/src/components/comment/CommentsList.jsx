import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CreateComment from "./CreateComment";

import Comment from "./Comment";

const CommentsList = forwardRef(({ postId }, ref) => {
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState();

  const { currentUser } = useSelector((state) => state.user);
  const { navigate } = useNavigate();
  const location = useLocation();

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment/getPostComments/${postId}`);
      const data = await res.json();

      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleLikeComment = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin", { state: { from: location }, replace: true });
        return;
      }
      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async (commentIdToDelete) => {
    try {
      const res = await fetch(
        `/api/comment/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments(
          comments.filter((comment) => comment._id !== commentIdToDelete)
        );
        setTotalComments((prv) => prv - 1);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditComment = async (comment, updatedContent) => {
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
        method: "PUT",
        body: JSON.stringify({
          content: updatedContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setComments(
          comments.map((c) =>
            c._id === comment._id ? { ...c, content: updatedContent } : c
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getPostComments/${postId}?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prvComments) => [...prvComments, ...data.comments]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={ref}>
      {currentUser ? (
        <CreateComment
          postId={postId}
          userId={currentUser._id}
          profilePicture={currentUser.profilePicture}
          username={currentUser.username}
          onPostComments={(newComment) => {
            setComments((prvComments) => [newComment, ...prvComments]);
            setTotalComments((prv) => prv + 1);
          }}
        />
      ) : (
        <div className="p-2 mt-2 gap-2 rounded-md border border-cyan-500">
          <Link
            to="/signin"
            state={{ from: location }}
            className="text-cyan-600 hover:underline font-semibold"
          >
            Sign-in
          </Link>
          <span> to add your comment on this post.</span>
        </div>
      )}
      <div
        className=" shadow-lg shadow-cyan-700 flex flex-col justify-between items-center gap-2 p-2 w-full
       lg:p-10 mb-5
      [&>*:not(:last-child)]:border-b-2 [&>*]:border-cyan-500"
      >
        <h1 className="text-lg font-semibold self-start border-none py-4">
          {" "}
          {totalComments === 0 ? (
            <span> No comments on this post yet</span>
          ) : totalComments === 1 ? (
            <span>1 comment on this post</span>
          ) : (
            <span>{totalComments} comments on this post</span>
          )}
        </h1>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            currentUser={currentUser}
            onDelete={handleDeleteComment}
            onLike={handleLikeComment}
            onEdit={handleEditComment}
          />
        ))}

        {totalComments > comments.length && (
          <button
            type="button"
            className="font-bold text-lg text-cyan-600 p-4 self-center
          hover:text-black hover:scale-105 transition-all"
            onClick={handleShowMore}
          >
            Show more comments
          </button>
        )}
      </div>
    </div>
  );
});

export default CommentsList;
