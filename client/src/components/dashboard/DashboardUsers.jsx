import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CiWarning } from "react-icons/ci";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user/getusers");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${users.length}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prvUsers) => [...prvUsers, ...data.users]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/deleteuser/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prvUsers) =>
          prvUsers.filter((user) => user._id !== userIdToDelete)
        );
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="flex flex-col justify-between items-center gap-1 p-2 w-full
       lg:max-w-7xl lg:mx-auto lg:p-10 lg:shadow-2xl 
      [&>*:not(:last-child)]:border-b [&>*]:border-gray-300 last:border-b-0"
      >
        <div className="flex flex-row w-full bg-gray-200 font-bold p-1 gap-2">
          <h1 className="w-3/6 ">User</h1>
          <h1 className="w-1/6">created</h1>
          <h1 className="w-1/6">admin</h1>
          <h1 className="w-1/6"></h1>
        </div>
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-row justify-between w-full hover:scale-105 transition-all"
          >
            <div className="flex flex-col w-3/6 flex-wrap gap-2">
              <div className="flex gap-2 ">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="h-10 w-10 object-contain rounded-full border border-gray-300"
                />
                <h2 className="font-semibold">{user.username}</h2>
              </div>
              <h2 className="text-gray-500 flex-wrap pb-1">{user.email}</h2>
            </div>

            <h2 className="text-gray-400 w-1/6 ">
              {new Date(user.createdAt).toLocaleDateString()}
            </h2>
            <div className="w-1/6 pl-4 pt-1">
              {user.isAdmin ? (
                <BsCheckLg className="text-green-500" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
            </div>
            <h2
              className=" text-red-500 w-1/6 cursor-pointer"
              onClick={() => {
                setShowDeleteModal(true);
                setUserIdToDelete(user._id);
              }}
            >
              Delete
            </h2>
          </div>
        ))}

        {totalUsers > users.length && (
          <button
            type="button"
            className="font-bold text-lg text-cyan-600 p-4 self-center
          hover:text-black hover:scale-105 transition-all"
            onClick={handleShowMore}
          >
            Show more users
          </button>
        )}
        {showDeleteModal && (
          <Modal
            onClose={() => {
              setShowDeleteModal(false);
            }}
          >
            <CiWarning className="text-5xl" />
            <h2>Are you sure you want to delete this user</h2>
            <div className="flex flex-row gap-5">
              <Button variant="delete" onClick={handleDeleteUser}>
                Yes, delete this user
              </Button>
              <Button
                variant="secondary"
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
      </div>
    </div>
  );
};

export default DashboardUsers;
