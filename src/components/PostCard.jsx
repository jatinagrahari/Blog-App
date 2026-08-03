import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";
import appwriteService from "../appwrite/config";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <div>
      <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex h-[170px] flex-col justify-between p-6">
          <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>

          <Link to={`/post/${$id}`}>
            <Button btnType="fullwBtn">Read More →</Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PostCard;
