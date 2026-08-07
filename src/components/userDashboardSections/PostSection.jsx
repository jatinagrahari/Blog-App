import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";

const PostSection = ({ allPosts, userId }) => {
  const navigate = useNavigate();

  const deletePost = (id) => {
    appwriteService.deletePost(id).then(() => {
      navigate(`/`);
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          My Posts
        </h2>

        <Link to="/create-post">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 sm:w-auto">
            <Plus size={18} />
            Create Post
          </button>
        </Link>
      </div>

      {allPosts?.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
          <h3 className="text-xl font-semibold text-gray-700">No posts yet</h3>

          <p className="mt-2 text-gray-500">
            Create your first blog post to get started.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2">
          {allPosts?.map((post) => (
            <div
              key={post.$id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5 md:p-6">
                <h3 className="line-clamp-2 text-lg font-semibold md:text-xl">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {new Date(post.$createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="w-full sm:w-auto"
                  >
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-gray-50">
                      <Pencil size={16} />
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deletePost(post.$id)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 sm:w-auto"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostSection;
