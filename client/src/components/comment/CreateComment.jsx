import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarIcon from "../ui/AvatarIcon";
import Button from "../ui/Button";
import { GrSend } from "react-icons/gr";
import LoadingSpinner from "../ui/LoadingSpinner";
import Alert from "../ui/Alert";

const CreateComment = ({
  postId,
  userId,
  profilePicture,
  username,
  onPostComments,
}) => {
  const [commentContent, setCommentContent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        body: JSON.stringify({
          content: commentContent,
          userId: userId,
          postId: postId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCommentContent("");
        onPostComments(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans">
      <div
        className="flex flex-col w-full max-w-3xl mx-auto p-2 mt-2 gap-2
        rounded-md border border-cyan-500 shadow-lg shadow-cyan-800"
      >
        <div className="flex gap-1 items-stretch">
          <AvatarIcon avatarPicture={profilePicture} />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-sm text-cyan-600 hover:underline"
          >
            @{username}
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Alert status="failure">{error}</Alert>
        ) : (
          <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
            <textarea
              value={commentContent}
              placeholder="your comment..."
              className="border rounded-md border-gray-300 p-3 focus:outline-none
             focus:border-slate-400 text-gray-600"
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <Button
              variant="secondary"
              type="submit"
              className="self-end transitin transition-all hover:scale-110"
              onSubmit={handleSubmit}
            >
              <GrSend />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
