import React, { useState } from "react";
import { Button, Container, Signup as SignupComponent } from "../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [registerd, setRegistered] = useState(false);
  const navigate = useNavigate();

  return registerd ? (
    <Container>
      <div className="flex justify-center items-center py-20">
        <div className=" max-w-5xl rounded-2xl border border-green-200 bg-green-50 p-20  text-center shadow-lg min-h-1/2 flex flex-col items-center justify-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl">🎉</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Registration Successful! Check your email
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Thank you for creating your account. Your registration has been
            completed successfully. <br /> We've sent a verification link to
            your email address. Please verify your email Or sign in.
          </p>

          <Button
            children={"Go to Login"}
            btnType={"otherBtn"}
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </Container>
  ) : (
    <Container>
      <SignupComponent onComplete={setRegistered} />
    </Container>
  );
};

export default Signup;
