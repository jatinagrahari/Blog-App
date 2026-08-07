import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, LoadingScreen, PostCard } from "../components";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      AppwriteService.getPost(id).then((dbpost) => {
        if (dbpost) {
          setPost(dbpost);
        } else {
          navigate("/");
        }
      });
    }
  }, [id, navigate]);

  const deletePost = () => {
    AppwriteService.deletePost(post.$id).then(() => {
      navigate("/all-posts");
    });
  };

  if (!post) {
    return <LoadingScreen />;
  }

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <Link
            to="/all-posts"
            className="text-sm font-medium text-gray-500 transition hover:text-green-600"
          >
            ← Back to Articles
          </Link>

          <header className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">
              Blog •{" "}
              {new Date(post.$createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-black leading-tight tracking-tight text-gray-900">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
              {/* Optional excerpt */}
            </p>
          </header>

          <div className="mt-10 flex items-center justify-between gap-6 border-b border-gray-200 pb-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {userData?.name || "Anonymous"}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl shadow-xl">
            <img
              src={AppwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          <article className="mx-auto mt-20 max-w-3xl">
            <div
              className="
              prose prose-lg lg:prose-xl max-w-none
              prose-headings:font-bold
              prose-headings:text-gray-900
              prose-headings:mt-14
              prose-headings:mb-6
              prose-p:leading-9
              prose-p:text-gray-700
              prose-p:my-8
              prose-img:rounded-3xl
              prose-img:shadow-lg
              prose-img:my-12
              prose-blockquote:border-l-4
              prose-blockquote:border-green-600
            "
            >
              {parse(post.content)}
            </div>
          </article>

          <hr className="mx-auto mt-20 max-w-7xl border-gray-200" />

          <section className="mx-auto mt-10 max-w-3xl">
            <h3 className="text-lg font-semibold">Tags</h3>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border px-4 py-2 text-sm">
                React
              </span>
              <span className="rounded-full border px-4 py-2 text-sm">
                Appwrite
              </span>
              <span className="rounded-full border px-4 py-2 text-sm">
                JavaScript
              </span>
            </div>
          </section>

          {isAuthor && (
            <section className="mx-auto mt-20 flex max-w-7xl justify-end gap-4 border-t pt-10">
              <button
                className="rounded-xl border px-6 py-3 cursor-pointer"
                onClick={() => navigate(`/edit-post/${post.$id}`)}
              >
                Edit Post
              </button>

              <button
                className="rounded-xl bg-red-600 px-6 py-3 text-white cursor-pointer"
                onClick={deletePost}
              >
                Delete Post
              </button>
            </section>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Post;
