import React, { useState } from "react";
import appwriteService from "../../appwrite/auth";
import AppwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../../store/authSlice";
import { LoadingScreen } from "../index";

const AccountSection = ({ id, allPosts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  async function handleDelete() {
    setLoader(true);
    try {
      setshowDeleteModal(false);
      for (const post of allPosts) {
        if (post.featuredImage) {
          await AppwriteService.deleteFile(post.featuredImage);
        }
        await AppwriteService.deletePost(post.$id);
      }
      await AppwriteService.createDelete({
        title: "User requested account deletion",
        deleteRequested: true,
        deleteRequestedAt: new Date().toISOString(),
        userId: id,
      });

      appwriteService.logOut();

      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  }
  return (
    <>
      {loader ? (
        <LoadingScreen />
      ) : (
        <section className="mt-6 md:mt-10">
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
                <h2 className="text-xl font-bold md:text-2xl">
                  Delete Account?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
                  This action cannot be undone. All of your posts and account
                  data will be permanently deleted.
                </p>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setshowDeleteModal(false)}
                    className="w-full rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    className="w-full rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700 sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
            Account Settings
          </h2>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:mt-8 md:p-8">
            <h3 className="text-lg font-semibold md:text-xl">
              Delete your Account
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Permanently remove your posts and submit an account deletion
              request. This action cannot be undone.
            </p>

            <button
              onClick={() => setshowDeleteModal(true)}
              className="mt-6 w-full rounded-xl border border-red-200 px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
            >
              Delete Account
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default AccountSection;
