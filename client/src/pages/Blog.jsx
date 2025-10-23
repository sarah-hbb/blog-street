import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/ui/Carousel";

const Blog = () => {
  const [posts, setPost] = useState([]);
  const [lastMonthPosts, setLastMonthPosts] = useState(null);

  const fetchAllPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?limit=100`);
      const data = await res.json();
      if (res.ok) {
        setPost(data.posts);
        setLastMonthPosts(data.lastMonthPosts);
      } else {
        console.log("There is a problem loading more post from this category");
      }
    } catch (error) {
      console.log("There is a problem loading more post from this category");
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="w-full mx-auto">
      <Carousel posts={posts} />
      <div className="mb-4 border border-slate-200 "></div>
      <div className="flex md:flex-col p-3 w-full mx-auto">
        {lastMonthPosts && (
          <div className="w-full max-w-lg flex flex-col p-4 border shadow-lg">
            <h1
              className="text-xl font-bold text-cyan-700 p-3 italic uppercase
           bg-gray-200 rounded"
            >
              Last month posts
            </h1>
            {lastMonthPosts.map((post, index) => (
              <div
                key={index}
                className="flex justify-between gap-3 p-2 min-w-full
                hover:scale-105 transition-all"
              >
                <Link
                  to={`/post/${post.slug}`}
                  className="flex-1 flex gap-3 p-1"
                >
                  <img
                    src={post.image}
                    alt=""
                    className="h-20 w-20 object-cover"
                  />
                  <div className="flex-1 flex flex-col  justify-between ">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
