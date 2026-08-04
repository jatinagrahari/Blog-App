import React, { useCallback, useEffect, useState } from "react";
import { Input, Button, RTE, Select } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppwriteService from "../appwrite/config";
import { useLocation } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const post = location.state?.post;
  const user = useSelector((state) => state.auth.userData);
  const [filePreview, setFilePreview] = useState(null);
  console.log(filePreview);

  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await AppwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        await AppwriteService.deleteFile(post.featuredImage);
        const dbPost = await AppwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
          if(dbPost) {
            navigate(`/post/${dbPost.$id}`);
          },
        });
      }
    } else {
      const file = data.image[0]
        ? await AppwriteService.uploadFile(data.image[0])
        : null;
      //   const uploadFile = await AppwriteService.uploadFile(file);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const createPost = await AppwriteService.createPost({
          ...data,
          userId: user.$id,
        });
        if (createPost) {
          navigate(`/post/${createPost.$id}`);
        }
      }
    }
  };
  // navigate(`/post/${id}`);

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      const slug = value.toLowerCase().replace(/ /g, "-");
      setValue("slug", slug);
      return slug;

      return "";
    }
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

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
                  readOnly
                />
              </div>

              {/* Content */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-4 block text-sm font-semibold text-gray-700">
                  Post Content :
                </label>

                <div className="h-125 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                  <RTE
                    name={"content"}
                    control={control}
                    defaultValue={getValues("content")}
                  />
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
                  {...register("image", {})}
                  css={"classic"}
                  onChange={(e) => {
                    setFilePreview(e.target.files[0]);
                  }}
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
              <div className="rounded-2xl  bg-white p-6 shadow-sm">
                <Select
                  label={"status"}
                  options={["active", "Inactive"]}
                  {...register("status", { required: true })}
                />
              </div>

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
