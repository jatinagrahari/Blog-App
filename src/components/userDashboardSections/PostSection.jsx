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
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
        <Link to={"/create-post"}>
          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white cursor-pointer">
            <Plus size={18} />
            Create Post
          </button>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {allPosts?.map((post) => (
          <div
            key={post.$id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="aspect-video bg-gray-200">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold">{post.title}</h3>

              <p className="mt-2 text-sm text-gray-500">
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mt-6 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2">
                    <Pencil size={16} />
                    Edit
                  </button>
                </Link>

                <button
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                  onClick={() => deletePost(post.$id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostSection;
