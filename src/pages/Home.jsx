import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, PostCard } from "../components";
import authService from "../appwrite/config";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService.getActivePosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center text-center">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              🚀 Share Ideas • Read Stories • Inspire Others
            </span>

            <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
              Publish Your Ideas,
              <br />
              <span className="text-green-600">One Story at a Time.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
              A modern blogging platform where you can write beautiful articles,
              upload images, manage your posts and share your knowledge with the
              world.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/all-posts">
                <Button btnType="fullwBtn">Explore Articles</Button>
              </Link>

              <Link to="/add-post">
                <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
                  Write Your First Post
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900">100+</h2>
                <p className="mt-2 text-gray-500">Articles</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900">50+</h2>
                <p className="mt-2 text-gray-500">Writers</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900">10K+</h2>
                <p className="mt-2 text-gray-500">Readers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="py-24">
        <Container>
          <div className="mb-14 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Featured Posts
              </h2>

              <p className="mt-3 text-gray-500">
                Discover some of the latest and most popular articles.
              </p>
            </div>

            <Link
              to="/all-posts"
              className="font-semibold text-green-600 hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard {...post} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose Our Blog?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Everything you need to write, publish and manage your articles in
              one place.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">
              <div className="mb-5 text-4xl">✍️</div>

              <h3 className="text-2xl font-semibold text-gray-900">
                Rich Editor
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Write beautiful articles with formatting, headings, images and
                code blocks using a powerful editor.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">
              <div className="mb-5 text-4xl">☁️</div>

              <h3 className="text-2xl font-semibold text-gray-900">
                Secure Storage
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Upload featured images and manage your content securely with
                Appwrite Storage.
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">
              <div className="mb-5 text-4xl">⚡</div>

              <h3 className="text-2xl font-semibold text-gray-900">
                Fast Experience
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Built with React, Redux Toolkit and Tailwind CSS for a modern,
                responsive and smooth experience.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="rounded-[36px] bg-green-600 px-8 py-20 text-center text-white shadow-xl">
            <h2 className="text-4xl font-bold md:text-5xl">
              Ready to Share Your Story?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100">
              Start writing today and publish articles that inspire, educate and
              reach readers around the world.
            </p>

            <div className="mt-10">
              <Link to="/add-post">
                <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 transition hover:scale-105">
                  Create Your First Post
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
