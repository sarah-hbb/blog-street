import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import AvatarIcon from "../ui/AvatarIcon";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import useSignout from "../../hooks/useSignout";
import { CiWarning } from "react-icons/ci";

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUoloading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const filePickerRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateErrorMessage(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateErrorMessage("No changes made to your profile!");
      return;
    }
    if (imageFileUoloading) {
      setUpdateErrorMessage("Please wait for image to upload 100%");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateErrorMessage(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateErrorMessage(error.message);
    }
  };

  // Upload an image for profile
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      // create url for uploaded image
      setImageFileUrl(URL.createObjectURL(imageFile));
    }
  };

  const uploadImage = async () => {
    // upload the selected image to firebase storage 🔥🔥🔥
    // add these lines to firebase rules
    // service firebase.storage {
    //  match /b/{bucket}/o {
    //   match /{allPaths=**} {
    //     allow read;
    //     allow write: if
    //     request.resource.size < 2*1024*1024 &&
    //     request.resource.contentType.matches('image/.*')
    //  }
    // }
    //}
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2 MB)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const handleDeleteAccount = async () => {
    setModalIsOpen(false);
    try {
      dispatch(deleteAccountStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteAccountFailure(data.message));
      } else {
        setDeleteAccountModalOpen(true);
        setTimeout(() => {
          dispatch(deleteAccountSuccess());
        }, 3000);
      }
    } catch (error) {
      dispatch(deleteAccountFailure(error.message));
    }
  };

  const handleSignout = useSignout();

  return (
    <div className="w-full p-3 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-semibold">Profile</h1>

      <form
        className="w-full md:w-96 flex flex-col gap-3 justify-center items-center"
        onSubmit={handleUserUpdateSubmit}
      >
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        {/* clicking on the avatar is like clicking on the hidden input above  */}
        <div
          onClick={() => filePickerRef.current.click()}
          className="cursor-pointer relative"
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <AvatarIcon
            avatarPicture={imageFileUrl || currentUser.profilePicture}
            size={"large"}
          />
        </div>
        {imageFileUploadError && (
          <Alert status="failure">{imageFileUploadError}</Alert>
        )}
        <div className="w-full flex flex-col gap-3">
          <Input
            placeholder={currentUser.username}
            defaultValue={currentUser.username}
            id="username"
            type="text"
            onChange={handleInputChange}
            borderError={false}
          />

          <Input
            placeholder={currentUser.email}
            defaultValue={currentUser.email}
            id="email"
            type="email"
            onChange={handleInputChange}
            borderError={false}
          />

          <Input
            placeholder="Password"
            defaultValue={currentUser.password}
            id="password"
            type="password"
            onChange={handleInputChange}
            borderError={false}
          />
          <Button
            type="submit"
            className="w-full"
            onClick={handleUserUpdateSubmit}
            variant="primary"
            disabled={loading || imageFileUoloading}
          >
            <span className="hover:font-semibold transition-all">
              {loading ? "Loading..." : "Update Profile"}
            </span>
          </Button>

          {updateUserSuccess && !imageFileUploadError && (
            <Alert status="success">{updateUserSuccess}</Alert>
          )}
          {updateErrorMessage && (
            <Alert status="failure">{updateErrorMessage}</Alert>
          )}
          {error && <Alert status="failure">{error}</Alert>}
        </div>
        <div className="flex justify-between w-full px-4 py-2 text-red-600">
          <button
            onClick={() => setModalIsOpen(true)}
            type="button"
            className="hover:font-semibold transition-all"
          >
            Delete Account
          </button>
          <button
            type="button"
            onClick={handleSignout}
            className="hover:font-semibold transition-all"
          >
            Sign out
          </button>
        </div>
      </form>
      {modalIsOpen && (
        <Modal
          onClose={() => {
            setModalIsOpen(false);
          }}
        >
          <CiWarning className="text-5xl" />
          <h2>Are you sure you want to delete your account?</h2>
          <div className="flex flex-row gap-5">
            <Button variant="delete" onClick={handleDeleteAccount}>
              Yes, delete my account
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              No, cancel
            </Button>
          </div>
        </Modal>
      )}
      {deleteAccountModalOpen && (
        <Modal onClose={() => setDeleteAccountModalOpen(false)}>
          <LoadingSpinner />
          <span>Your account is being deleted...</span>
        </Modal>
      )}
    </div>
  );
};

export default DashboardProfile;
