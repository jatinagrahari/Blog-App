import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Layout } from "./components";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  About,
  AllPosts,
  Home,
  Signup,
  Login,
  Post,
  CreatePost,
  EditPost,
  UserDashboard,
  VerifyEmail,
} from "./pages";
import { AuthLayout } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />

      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="/create-post"
        element={
          <AuthLayout authentication>
            <CreatePost />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:id"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />

      <Route
        path="/all-posts"
        element={
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        }
      />

      <Route
        path="/Post/:id"
        element={
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        }
      />

      <Route
        path="/user/:id"
        element={
          <AuthLayout authentication>
            <UserDashboard />
          </AuthLayout>
        }
      />

      <Route path="/verify-email" element={<VerifyEmail />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
