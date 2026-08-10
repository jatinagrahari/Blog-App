import React from "react";
import { Button } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as authLogout } from "../store/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      authService.logOut();
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button btnType={"primary"} children={"Log Out"} onClick={logout} />
    </div>
  );
};

export default Logout;
