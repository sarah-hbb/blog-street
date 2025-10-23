import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CiWarning } from "react-icons/ci";

const DashboardPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        setTotalPosts(data.totalPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prv) => [...prv, ...data.posts]);
      }
    } catch (error) {}
  };

  const handleDeletePost = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prv) =>
          prv.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="flex flex-col items-center gap-1 p-2 
        lg:max-w-7xl lg:mx-auto lg:p-10 lg:shadow-2xl
      [&>*:not(:last-child)]:border-b [&>*]:border-gray-300 last:border-b-0"
      >
        {userPosts.map((post, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 p-2 min-w-full
          hover:scale-105 transition-all"
          >
            <Link to={`/post/${post.slug}`} className="flex-1 flex gap-3 p-1">
              <img src={post.image} alt="" className="h-20 w-20 object-cover" />
              <div className="flex-1 flex flex-col lg:flex-row justify-between lg:gap-9">
                <h1 className="flex-1 text-lg uppercase font-semibold">
                  {post.title}
                </h1>
                <h3>{post.category}</h3>
                <span className="text-gray-500">
                  Last updated at{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
            <div className="flex flex-row gap-4">
              <Link to={`/update-post/${post._id}`}>
                <h3 className="text-cyan-700 hover:font-semibold">Edit</h3>
              </Link>

              <h3
                className="text-red-600 cursor-pointer hover:font-semibold"
                onClick={() => {
                  setShowDeleteModal(true);
                  setPostIdToDelete(post._id);
                }}
              >
                Delete
              </h3>
            </div>
          </div>
        ))}
        {totalPosts > userPosts.length && (
          <button
            type="button"
            className="font-bold text-lg text-cyan-600 p-4 self-center
          hover:text-black hover:scale-105 transition-all"
            onClick={handleShowMore}
          >
            Show more posts
          </button>
        )}
        {showDeleteModal && (
          <Modal
            onClose={() => {
              setShowDeleteModal(false);
            }}
          >
            <CiWarning className="text-5xl" />
            <h2>Are you sure you want to delete this post</h2>
            <div className="flex flex-row gap-5">
              <Button variant="delete" onClick={handleDeletePost}>
                Yes, delete this post
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DashboardPosts;
