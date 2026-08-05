import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "./index";

const AuthLayout = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authStatus, authentication]);

  return loader ? <LoadingScreen /> : <>{children};</>;
};

export default AuthLayout;
