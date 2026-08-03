import React, { useState } from "react";
import { Button, Container, Input } from "./index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";

const Signup = ({ onComplete }) => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  const signup = async (data) => {
    setErrors("");
    try {
      const user = await authService.createAccount(data);
      console.log(user);
      if (user) {
        onComplete(true);
      }
      // navigate("/");
    } catch (error) {
      setErrors(error.message);
    }
  };
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-16">
      <form
        className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 shadow-xl"
        onSubmit={handleSubmit(signup)}
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account 🚀
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join our community and start sharing your stories.
          </p>
        </div>

        {errors && (
          <p className="text-red-600 mt-8 text-center text-sm">
            Error! - {errors}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {/* Full Name */}
          <Input
            label={"Full Name"}
            type={"text"}
            placeholder={"John Doe"}
            {...register("name", {
              required: true,
            })}
            css={"classic"}
          />

          {/* Email */}
          <Input
            label={"Email Address"}
            type={"email"}
            placeholder={"john@email.com"}
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            css={"classic"}
          />

          {/* Password */}
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Password"}
            {...register("password", {
              required: true,
            })}
            css={"classic"}
          />

          {/* Confirm Password */}
          {/* <Input
              label={"Confirm Password"}
              type={"password"}
              placeholder={"Confirm Password"}
            /> */}
        </div>
        {/* terms */}
        <div className="flex items-start gap-3 py-5">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-700"
          />
          <p className="text-sm text-gray-600">
            I agree to the
            <span className="font-medium text-green-700 hover:underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="font-medium text-green-700 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 cursor-pointer"
        >
          Create Account
        </button>
        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Button btnType={"otherBtn"} onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </p>
      </form>
    </section>
  );
};

export default Signup;
