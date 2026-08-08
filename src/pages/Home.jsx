import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, PostCard } from "../components";
import authService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts } from "../store/postsSlice";
import { LogOut } from "lucide-react";

const Home = () => {
  const userStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.allPosts);
  const [message, setMessage] = useState(null);
  // const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!userStatus) return;

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
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-linear-to-b from-white to-gray-50">
        <Container>
          <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-12 text-center md:min-h-[80vh] md:py-0">
            <span className="rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-700 sm:px-4 sm:text-sm">
              🚀 Share Ideas • Read Stories • Inspire Others
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:mt-8 md:text-7xl">
              Publish Your Ideas,
              <br />
              <span className="text-green-600">One Story at a Time.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:mt-8 md:text-lg md:leading-8">
              A modern blogging platform where you can write beautiful articles,
              upload images, manage your posts and share your knowledge with the
              world.
            </p>

            <div className="mt-8 flex  flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center md:mt-10">
              {!userStatus ? (
                <Link to="/signup" className="">
                  <Button btnType="fullwBtn">Get Started</Button>
                </Link>
              ) : (
                <Link to="/all-posts">
                  <Button btnType="fullwBtn">Explore Articles</Button>
                </Link>
              )}

              <Link to="/create-post">
                <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer">
                  Write Your First Post
                </button>
              </Link>
            </div>

            {/* Stats */}
            {/* <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:mt-20">
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
            </div> */}
          </div>
        </Container>
      </section>

      {/* Featured Posts */}

      {!userStatus ? (
        <section className="bg-gray-50 py-16 md:py-24">
          <Container>
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6 md:p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                🔒
              </div>

              <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">
                Featured Posts are for Members
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-500 text-sm md:text-base">
                Sign in to explore hand-picked articles, tutorials, and
                community highlights selected just for our members.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Link
                  to="/login"
                  className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <Container>
          <section className="py-14 md:py-24">
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Featured Posts
                </h2>

                <p className="mt-2 text-sm text-gray-500 md:mt-3 md:text-base">
                  Discover some of the latest and most popular articles.
                </p>
              </div>

              <Link
                to="/all-posts"
                className="self-start font-semibold text-green-600 hover:underline md:self-auto"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {allPosts.length === 0 ? (
                <h1>{message}</h1>
              ) : (
                allPosts
                  .slice(0, 3)
                  .map((post) => <PostCard key={post.$id} {...post} />)
              )}
            </div>
          </section>
        </Container>
      )}

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
