import React from "react";

const ProfileSection = ({ postCount, name, email, createdAt, logo }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Profile</h2>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:mt-8 md:p-8">
        {/* User Info */}
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white md:h-24 md:w-24 md:text-3xl">
            {logo}
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-xl font-semibold text-gray-900">
              {name}
            </h3>

            <p className="break-all text-sm text-gray-500 md:text-base">
              {email}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:gap-6">
          <div className="rounded-xl border p-5 text-center">
            <p className="text-sm text-gray-500">Total Posts</p>

            <h4 className="mt-2 text-3xl font-bold">{postCount}</h4>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <p className="text-sm text-gray-500">Joined</p>

            <h4 className="mt-2 text-2xl font-bold md:text-3xl">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
