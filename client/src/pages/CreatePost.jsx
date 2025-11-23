import { useState } from "react";
import { useNavigate } from "react-router-dom";
// in case of using React-quill
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
//import TextEditor from "../components/textEditor/TextEditor";

// UI
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { set } from "mongoose";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState(null);

  const navigate = useNavigate();

  const handleChangeImageFile = (e) => {
    setFile(e.target.files[0]);
    setImageUploadError(null);
  };
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      // upload file in firebase
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(
            "Could not upload image (File must be less than 2 MB)"
          );
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload faild");
      setImageUploadProgress(null);
    }
  };

  const handleGenerateContent = async () => {
    setGenerating(true);
    setSummaryError(null);
    setSummary("");

    try {
      const res = await fetch("/api/summary/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: formData.title,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({ ...formData, content: data.summary });
      }
    } catch (error) {
      setSummaryError("Failed to fetch summary");
      console.error("Error generating content:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong :(");
    }
  };

  const categoryOptions = [
    {
      value: "uncategorized",
      label: "Select a category",
      disabled: true,
      selected: true,
    },
    { value: "javascript", label: "Javascript" },
    { value: "react.js", label: "React.js" },
    { value: "next.js", label: "Next.js" },
    { value: "typescript", label: "Typescript" },
    { value: "github", label: "Git-hub" },
    { value: "travel", label: "Travel" },
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["blockquote", "code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div
      className="flex flex-col justify-center items-center
     gap-3 p-4 w-full sm:w-3/4 sm:max-w-5xl sm:mx-auto"
    >
      <h1 className="font-semibold text-3xl">Create a post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
          <Input
            type="text"
            placeholder="Title"
            id="title"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Select
            className="sm:w-3/5"
            options={categoryOptions}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          />
        </div>
        <div
          className="flex flex-col gap-4 items-center justify-center border-2 border-dotted
        border-cyan-600 p-3"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              accept="image"
              className="rounded-md border-1 border-black file:bg-black
             file:text-white"
              onChange={handleChangeImageFile}
            />

            <Button
              variant="primary"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              <span>Upload Image</span>
            </Button>
          </div>

          {imageUploadError && (
            <Alert status="failure">{imageUploadError}</Alert>
          )}
          {imageUploadProgress && (
            <div className="w-16 h-16">
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0} %`}
              />
            </div>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
        </div>

        <div className="flex flex-row gap-4 self-end">
          <h1 className="text-purple-400">magic article generator</h1>
          <button
            type="button"
            className={`text-2xl hover:rotate-[30deg] hover:scale-125 transition-all ${
              generating ? "animate-pulse" : ""
            }`}
            onClick={handleGenerateContent}
          >
            🪄
          </button>
        </div>

        <ReactQuill
          value={formData.content}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={(value) => setFormData({ ...formData, content: value })}
          placeholder="Write your post..."
        />

        {/* <TextEditor
          onChange={(value) => setFormData({ ...formData, content: value })}
        /> */}

        {publishError && <Alert status="failure">{publishError}</Alert>}
        <Button type="submit" variant="neon" className="self-end">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
