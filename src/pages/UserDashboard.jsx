import React, { useEffect, useState } from "react";
import { Container } from "../components";
import { User, FileText, Settings, LogOut } from "lucide-react";
import { AccountSection, PostSection, ProfileSection } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const user = useSelector((state) => state.auth.userData);
  const [allPosts, setallPosts] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts && user) {
        const userPosts = posts.rows.filter((post) => post.userId === user.$id);
        setallPosts(userPosts);
      }
    });
  }, [user]);

  const sections = {
    profile: (
      <ProfileSection
        logo={user.name[0].toUpperCase()}
        name={user.name}
        email={user.email}
        createdAt={user.$createdAt}
        postCount={allPosts?.length}
      />
    ),
    post: <PostSection allPosts={allPosts} userId={user.$id} />,
    account: <AccountSection id={user.$id} allPosts={allPosts} />,
  };

  return (
    <section className="bg-gray-50 py-4 md:py-6">
      <Container>
        <div className="flex h-[calc(100vh-100px)] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-5 py-5 md:px-8 md:py-6">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Welcome back, {user.name}. Manage your blog from one place.
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="border-b border-gray-200 bg-gray-50 p-4 lg:col-span-3 lg:h-full lg:border-b-0 lg:border-r lg:p-6">
              {/* User */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white md:h-16 md:w-16 md:text-2xl">
                  {user.name[0].toUpperCase()}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">{user.name}</h2>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-3 lg:overflow-visible">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium transition lg:w-full ${
                    activeTab === "profile"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("post")}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium transition lg:w-full ${
                    activeTab === "post"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FileText size={18} />
                  <span>My Posts</span>
                </button>

                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium transition lg:w-full ${
                    activeTab === "account"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings size={18} />
                  <span>Account</span>
                </button>

                <button className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50 lg:mt-10 lg:w-full">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:col-span-9 lg:p-8">
              {sections[activeTab]}
            </main>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UserDashboard;
