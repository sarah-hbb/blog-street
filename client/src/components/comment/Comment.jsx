import { useEffect, useState } from "react";
import AvatarIcon from "../ui/AvatarIcon";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import moment from "moment";

const Comment = ({ comment, currentUser, onDelete, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const canDeleteComment =
    currentUser && (currentUser.isAdmin || comment.userId === currentUser._id);

  const canEditPost = currentUser && comment.userId === currentUser._id;

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${comment.userId}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [comment]);

  const handleDelete = () => {
    onDelete(comment._id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedContent(comment.content);
  };

  const handleUpdateComment = () => {
    setEditMode(false);
    onEdit(comment, updatedContent);
  };

  return (
    <>
      <div className="flex flex-row w-full gap-2">
        <AvatarIcon avatarPicture={user.profilePicture} />
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-3 items-center">
            <h1 className="text-sm font-medium">
              {user ? `@${user.username}` : "anonymouse user"}
            </h1>
            <h2 className="text-gray-400 ">
              {moment(comment.createdAt).fromNow()}
            </h2>
          </div>
          {editMode ? (
            <div className="w-full font-sans">
              <div
                className="flex flex-col w-full p-2 mt-2 gap-2
                   rounded-md border border-cyan-500 shadow-lg shadow-cyan-800"
              >
                <form className="flex flex-col gap-2 w-full">
                  <textarea
                    value={updatedContent}
                    className="border rounded-md border-gray-300 p-3 focus:outline-none
                     focus:border-slate-400 text-gray-600"
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  ></textarea>
                  <div className="justify-end flex flex-row gap-3 text-red-500">
                    <button type="button" onClick={() => setEditMode(false)}>
                      Cancel editing
                    </button>
                    <Button
                      inverseColor={true}
                      type="button"
                      className="self-end transition-all"
                      onClick={handleUpdateComment}
                    >
                      <span>Update comment</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <h1 className="text-slate-500">{comment.content}</h1>
          )}
          <div
            className="flex flex-row gap-4 p-1 border-t border-slate-300 text-sm
            [&>*]:text-gray-400 "
          >
            {/* Like btn */}
            <div className="flex items-center gap-1">
              {currentUser && (
                <button
                  type="button"
                  className=" transition-all"
                  disabled={editMode}
                  onClick={() => onLike(comment._id)}
                >
                  <AiFillLike
                    className={`${
                      currentUser && comment.likes.includes(currentUser._id)
                        ? "text-cyan-700"
                        : ""
                    } "hover:text-cyan-500 transition-all hover:scale-125 text-lg hover:-rotate-12"
                      
                   `}
                  />
                </button>
              )}

              {comment.numberOfLikes > 0 && (
                <h3>
                  {`${comment.numberOfLikes} ${
                    comment.numberOfLikes > 1 ? "likes" : "like"
                  } `}
                </h3>
              )}
            </div>
            {/* Edit btn */}
            {canEditPost && (
              <button
                type="buton"
                className={`${
                  editMode ? "text-red-600 font-bold" : "text-gray-400"
                } hover:scale-110 hover:text-gray-700 transition-all`}
                onClick={handleEdit}
              >
                Edit
              </button>
            )}

            {/* delete btn */}
            {canDeleteComment && (
              <button
                type="button"
                disabled={editMode}
                onClick={() => setShowDeleteModal(true)}
              >
                <MdDeleteOutline className="text-lg hover:text-red-600 hover:scale-110 transition-all" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          onClose={() => {
            setShowDeleteModal(false);
          }}
        >
          <CiWarning className="text-5xl" />
          <h2>Are you sure you want to delete comment?</h2>
          <div className="flex flex-row gap-5">
            <Button variant="delete" onClick={handleDelete} type="button">
              Yes, delete this comment
            </Button>
            <Button
              inverseColor={true}
              onClick={() => {
                setShowDeleteModal(false);
              }}
              type="button"
            >
              No, cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Comment;
