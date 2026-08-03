import React, { useState } from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppwriteService from "../appwrite/config";

const AddPost = ({ post }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    if (post) {
    } else {
      console.log({ data });
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Create New Post
            </h1>
            <p className="mt-2 text-gray-500">
              Share your thoughts with the community.
            </p>
          </div>
          {/* form */}
          <form
            className="grid gap-8 lg:grid-cols-3"
            onSubmit={handleSubmit(submit)}
          >
            <div className="space-y-6 lg:col-span-2">
              {/* Title */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <Input
                  type={"text"}
                  label={"Title"}
                  placeholder={"Enter The Title"}
                  {...register("title", {
                    required: true,
                  })}
                  css={"classic"}
                />
              </div>

              {/* Slug */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <Input
                  label={"Slug"}
                  placeholder={"Post URL will be"}
                  css={"classic"}
                  {...register("slug", {
                    required: true,
                  })}
                  css={"classic"}
                />
              </div>

              {/* Content */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-4 block text-sm font-semibold text-gray-700">
                  Post Content
                </label>

                <div className="h-[500px] rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                  TinyMCE Editor Here
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Featured Image */}
              <div className="relative h-56 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden">
                <Input
                  className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer"
                  css={"file"}
                  type={"file"}
                  {...register("featuredImage", {})}
                  css={"classic"}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <svg
                    className="mb-3 h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
                    />
                  </svg>

                  <span className="mt-3 text-sm font-medium">
                    Click to upload image
                  </span>

                  <span className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </div>

              {/* Status */}
              {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200">
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </div> */}

              {/* Buttons */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                  >
                    Publish Post
                  </button>

                  {/* <button
                    type="button"
                    className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    Save as Draft
                  </button> */}

                  <button
                    type="button"
                    className="w-full rounded-xl border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
