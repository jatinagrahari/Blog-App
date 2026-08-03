import React from "react";

const PostCard = () => {
  return (
    <div>
      <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Post"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 line-clamp-2">
            Building a Modern React Blog with Appwrite
          </h2>

          <p className="mb-6 text-gray-600 leading-relaxed line-clamp-3">
            Learn how to build a production-ready blogging platform using React,
            Appwrite, Redux Toolkit and TinyMCE with authentication, image
            upload and complete CRUD operations.
          </p>

          <button className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800">
            Read More →
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostCard;
