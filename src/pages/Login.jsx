import React from "react";
import { Button, Container, Input } from "../components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-6 py-16">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to continue to your account.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-green-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Login Button */}
              <Button children={"Sign In"} type={"fullwBtn"} />
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?
              <Button
                type={"otherBtn"}
                children={"Create Account"}
                onClick={() => navigate("/signup")}
              />
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Login;
