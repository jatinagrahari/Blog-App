import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Container } from "../components";
import authService from "../appwrite/auth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");

      if (!userId || !secret) {
        setStatus("error");
        setError("Invalid or incomplete verification link.");
        return;
      }

      try {
        await authService.verifyEmail(userId, secret);

        setStatus("success");
      } catch (error) {
        setStatus("error");
        setError(error.message);
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (status === "verifying") {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-2xl font-bold">Verifying your email...</h2>
        </div>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">
            Verification Failed
          </h2>

          <p className="mt-3 text-gray-600">{error}</p>

          <Button
            children="Go to Login"
            btnType="otherBtn"
            onClick={() => navigate("/login")}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-green-700">
          Email Verified Successfully!
        </h2>

        <p className="mt-3 text-gray-600">
          Your email has been verified. You can now sign in.
        </p>

        <Button
          children="Go to Login"
          btnType="otherBtn"
          onClick={() => navigate("/login")}
        />
      </div>
    </Container>
  );
};

export default VerifyEmail;
