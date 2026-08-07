import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import authService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts } from "../store/postsSlice";

const AllPosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.posts.allPosts);

  useEffect(() => {
    authService
      .userPosts(user.$id)
      .then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.rows));
        }
      })
      .catch((error) => dispatch(setError(error.message)));
  }, []);

  return (
    <div>
      <Container>
        <section className="min-h-screen bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            {/* Heading */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900">
                Explore Articles
              </h1>

              <p className="mt-3 text-gray-500">
                Discover stories, tutorials and insights from the community.
              </p>
            </div>

            {/* Search + Filters */}
            {/* <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <input
            type="text"
            placeholder="Search articles..."
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-green-600 md:max-w-md"
            />
            
            <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-green-600 px-5 py-2 text-white">
            All
            </button>
            
            <button className="rounded-full border border-gray-300 bg-white px-5 py-2 hover:bg-gray-100">
            React
            </button>
            
            <button className="rounded-full border border-gray-300 bg-white px-5 py-2 hover:bg-gray-100">
            JavaScript
            </button>
            
            <button className="rounded-full border border-gray-300 bg-white px-5 py-2 hover:bg-gray-100">
            CSS
            </button>
            </div>
            </div> */}

            {/* Posts Grid */}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {allPosts.map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AllPosts;
