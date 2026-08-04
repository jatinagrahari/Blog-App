import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container } from "../components";
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
    return (
      <Container>
        <div className="flex min-h-[70vh] items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-500">
            Loading article...
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-5 border-b border-gray-200 pb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
              {userData?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {userData?.name || "Anonymous"}
              </p>

              <p className="text-sm text-gray-500">Published Article</p>
            </div>

            {isAuthor && (
              <div className="ml-auto flex gap-3">
                <button
                  className="rounded-xl border border-gray-300 bg-white px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                  onClick={() =>
                    navigate("/create-post", {
                      state: { post },
                    })
                  }
                >
                  Edit
                </button>

                <button
                  onClick={deletePost}
                  className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="mt-12 overflow-hidden rounded-4xl shadow-xl">
            <img
              src={AppwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="h-112.5 w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          {/* Article */}
          <article className="mx-auto mt-16 max-w-3xl">
            <div
              className="
                prose
                prose-lg
                max-w-none

                prose-headings:font-bold
                prose-headings:text-gray-900

                prose-p:text-gray-700
                prose-p:leading-8

                prose-img:rounded-2xl
                prose-img:shadow-lg

                prose-a:text-green-600
                prose-strong:text-gray-900

                prose-blockquote:border-l-green-500
                flex flex-col
                "
            >
              <span className="text-xl font-semibold">Content :</span>
              <br />
              {parse(post.content)}
            </div>
          </article>

          {/* Bottom Actions */}
        </div>
      </Container>
    </section>
  );
};

export default Post;
