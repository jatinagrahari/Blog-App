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
      setallPosts(posts.rows);
    });
  }, []);

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
    <section className="h-screen bg-gray-50 py-6">
      <Container>
        <div className="flex h-[calc(100vh-100px)] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <p className="mt-2 text-gray-500">
              Welcome back, {user.name}. Manage your blog from one place.
            </p>
          </div>

          {/* Body */}
          <div className="grid flex-1 grid-cols-12 overflow-hidden">
            {/* Sidebar */}
            <aside className="col-span-3 h-full border-r border-gray-200 bg-gray-50 p-6">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
                  {user.name[0].toUpperCase()}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">{user.name}</h2>
                </div>
              </div>

              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    activeTab === "profile"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  onClick={() => setActiveTab("post")}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    activeTab === "post"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FileText size={18} />
                  My Posts
                </button>

                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    activeTab === "account"
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings size={18} />
                  Account
                </button>

                <button className="mt-10 flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50">
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="col-span-9 h-full overflow-y-auto p-8">
              {sections[activeTab]}
            </main>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UserDashboard;
