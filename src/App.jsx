import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin, logout as authLogout } from "./store/authSlice";
import { Layout, LoadingScreen } from "./components";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        let user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin(user));
        } else {
          dispatch(authLogout());
        }
      } catch (error) {
        dispatch(authLogout());
      }
    };

    checkUser().finally(() => setLoading(false));
  }, [dispatch]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
