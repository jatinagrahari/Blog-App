import React from "react";

const ProfileSection = ({ postCount, name, email, createdAt, logo }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
            {logo}
          </div>

          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total Posts</p>
            <h4 className="mt-2 text-3xl font-bold">{postCount}</h4>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">Joined</p>
            <h4 className="mt-2 text-3xl font-bold">
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
