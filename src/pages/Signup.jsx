import React from "react";
import { Button, Container } from "../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-6 py-16">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Create an Account 🚀
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Join our community and start sharing your stories.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>

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
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Terms */}
              {/* <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-700"
                />

                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="font-medium text-green-700 hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-green-700 hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div> */}

              {/* Signup Button */}
              <Button children={" Create Account"} type={"fullwBtn"} />
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Login */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Button
                type={"otherBtn"}
                children={"Sign In"}
                onClick={() => navigate("/login")}
              />
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Signup;
