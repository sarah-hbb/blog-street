import { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Alert from "../components/ui/Alert";
import CommentsList from "../components/comment/CommentsList";

import { PiBookmarkSimpleDuotone } from "react-icons/pi";
import useBookmark from "../hooks/useBookmark";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"; // Monokai theme
import Button from "../components/ui/Button";

const Post = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postCategory, setPostCategory] = useState();
  const [postsByCategory, setPostsByCategory] = useState([]);
  const [loadingPostsByCategory, setLoadingPostsByCategory] = useState(true);
  const [errorPostsByCategory, setErrorPostsByCategory] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const { handleBookmark } = useBookmark();
  const location = useLocation();
  const commentsRef = useRef(null);
  const contentRef = useRef(null);

  const fetchPostBySlug = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        if (data.posts.length === 0) {
          setError("Ooops! there is problem loading the post");
        } else {
          setPost(data.posts[0]);
          setPostCategory(data.posts[0].category);
          setError(null);
        }
      }
    } catch (error) {
      setError("something went wrong :(");
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByCategory = async () => {
    try {
      setLoadingPostsByCategory(true);
      const res = await fetch(`/api/post/getposts?category=${postCategory}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorPostsByCategory(data.message);
      } else {
        setPostsByCategory(data.posts);
        setErrorPostsByCategory(null);
      }
    } catch (error) {
      setErrorPostsByCategory(
        "There is a problem loading more post from this category"
      );
    } finally {
      setLoadingPostsByCategory(false);
    }
  };

  useEffect(() => {
    fetchPostBySlug();
  }, [postSlug]);

  useEffect(() => {
    if (postCategory) {
      fetchPostsByCategory();
    }
  }, [postCategory]);

  // Scroll to comments section if user came from signin page
  useEffect(() => {
    if (location.state?.fromSignin) {
      setTimeout(() => {
        commentsRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [location]);

  // Apply highlight.js to all <pre><code> blocks after rendering
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll("code.ql-syntax").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [post]);

  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert status="failure" className="w-1/4 text-center">
          {error}
        </Alert>
      ) : (
        <main
          className="w-full 
          border-b border-gray-300
            flex flex-col justify-center font-serif"
        >
          <div className="relative w-full">
            {/* bookmarks section */}
            <div className="absolute z-10 top-2 right-0 flex flex-row items-center justify-center gap-1">
              {post.numberOfBookmarks !== 0 && (
                <div className="text-amber-400 font-semibold flex flex-row gap-1">
                  <span>{post.numberOfBookmarks}</span>
                  <span className="sm:block hidden">{`${
                    post.numberOfBookmarks === 1 ? "bookmark" : "bookmarks"
                  }`}</span>
                </div>
              )}
              <button onClick={() => handleBookmark(post, setPost)}>
                <PiBookmarkSimpleDuotone
                  className={`text-3xl ${
                    post.bookmarks.includes(currentUser?._id)
                      ? "text-amber-400"
                      : "text-slate-400"
                  } `}
                />
              </button>
            </div>
            <img
              src={post.image}
              alt=""
              className="w-full h-[30vh] sm:h-[50vh] object-cover object-center blur-[1px] brightness-[0.1] "
            />
            {/* Post title over the image */}
            <h1
              className="absolute mx-4 top-[20%] max-w-7xl text-xl sm:text-6xl text-left 
            font-bold italic text-slate-200 bg-cyan-600 bg-opacity-20 p-4 rounded shadow-lg
            animate-slideRightToView
            "
            >
              {post.title}
            </h1>

            {/* Edit post button - only visible to admin */}
            {currentUser && currentUser.isAdmin && (
              <div className="absolute bottom-8 right-4">
                <Button variant="secondary" size="lg">
                  <Link to={`/update-post/${post._id}`}>Edit post</Link>
                </Button>
              </div>
            )}
          </div>

          {/* {Post content and comments section} + category section */}
          <div className="p-5 w-full flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-start">
            {/* Post content and comments section */}
            <div className="relative overflow-hidden sm:w-2/3 sm:-top-[20vh] animate-slideRightToView">
              {/* Post content */}
              <div
                ref={contentRef}
                // post-content class added to style innerHTML of post content. you can style it in index.css file
                dangerouslySetInnerHTML={{ __html: post.content }}
                className=" post-content p-6 
              text-slate-200 sm:bg-cyan-600 sm:bg-opacity-20 sm:rounded "
              ></div>

              {/* Comments setion */}
              <div className="flex flex-col w-full max-w-3xl mx-auto p-2 mt-2 gap-4">
                <CommentsList postId={post._id} ref={commentsRef} />
              </div>
            </div>

            {/* More posts from this category */}
            {loadingPostsByCategory ? (
              <LoadingSpinner />
            ) : (
              <div className="sm:w-1/3 w-full">
                {postsByCategory.length === 0 ? (
                  <Alert status={"failure"}>{errorPostsByCategory}</Alert>
                ) : (
                  <div
                    className=" bg-cyan-200 bg-opacity-10 flex flex-col justify-center 
                    border-t-2 border-white p-6 my-4 overflow-hidden animate-slideDownToView"
                  >
                    <h1 className="text-2xl font-bold text-slate-200 italic mb-4">
                      More posts from {post.category} category
                    </h1>
                    {postsByCategory
                      .filter((p) => p._id !== post._id)
                      .map((post) => (
                        <div className="hover:underline my-1" key={post.id}>
                          <Link to={`/post/${post.slug}`}>{post.title} </Link>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Post;
