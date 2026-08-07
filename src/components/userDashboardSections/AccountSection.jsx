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
        <section className="mt-14">
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-bold">Delete Account?</h2>

                <p className="mt-3 text-gray-600">
                  This action cannot be undone. All of your posts and account
                  data will be permanently deleted.
                </p>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-xl border px-5 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    className="rounded-xl bg-red-600 px-5 py-2 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

          <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {/* <button className="w-full rounded-xl border px-5 py-3 text-left hover:bg-gray-50">
          Change Password
        </button> */}
            <h2 className="font-bold text-xl">Delete your Account </h2>

            <button
              className="w-full rounded-xl border border-red-200 px-5 py-3 text-left text-red-600 hover:bg-red-50"
              onClick={() => setshowDeleteModal(true)}
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
