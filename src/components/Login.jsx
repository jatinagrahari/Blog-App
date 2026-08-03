import React, { useState } from "react";
import { Button, Container, Input } from "./index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [errors, setErros] = useState(null);
  const user = useSelector((state) => state.auth.userData);

  const login = async (data) => {
    setErros("");
    try {
      const user = await authService.login(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setErros(error.message);
    }
  };
  return (
    <div>
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

          {errors && (
            <p className="text-red-600 mt-8 text-center text-sm">
              Error! - {errors}
            </p>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(login)}>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Input
                label={"Email"}
                placeholder={"Enter Your Email Adress"}
                type={"email"}
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Email address must be a valid address",
                  },
                })}
                css={"classic"}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Input
                label={"Password"}
                placeholder={"Enter Your Password"}
                type={"password"}
                {...register("password", {
                  required: true,
                })}
                css={"classic"}
              />
            </div>
            {/* <button
                type="button"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Forgot Password?
              </button> */}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 cursor-pointer"
            >
              Sign In
            </button>
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
              btnType={"otherBtn"}
              children={"Create Account"}
              onClick={() => navigate("/signup")}
            />
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
