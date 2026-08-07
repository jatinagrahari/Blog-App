import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Logout, PostForm } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [open, setisOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const userName = useSelector((state) =>
    state.auth.userData ? state.auth.userData.name : null,
  );
  // const [navMenu, setNavMenu] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setisOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <div className="sticky top-0 w-full bg-white">
      <Container>
        <div className=" flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div>
            <NavLink to={"/"}>
              <h1 className="text-2xl font-bold">
                Blog<span className="text-green-800">App</span>
              </h1>
            </NavLink>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="hidden  md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) =>
                link.active ? (
                  <NavLink
                    key={link.name}
                    to={link.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 hover:text-green-600"
                    }
                  >
                    <div>{link.name}</div>
                  </NavLink>
                ) : null,
              )}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="">
            {authStatus ? (
              <>
                {/* desktop profile menu */}
                <div className="hidden md:flex items-center gap-4">
                  <NavLink to={"/create-post"}>
                    <Button children={"Create Post"} btnType={"secondary"} />
                  </NavLink>

                  <div className="relative">
                    <button onClick={() => setisOpen(!open)} ref={menuRef}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold  cursor-pointer">
                        <div className="">{userName[0].toUpperCase()}</div>
                      </div>
                    </button>

                    <div
                      className={`absolute top-full right-0 mt-2 w-56 rounded-2xl bg-black/20 text-black/80 font-semibold transition-all duration-300 shadow-xl border border-gray-200
                      ${
                        open
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="flex flex-col gap-4 items-center rounded-lg px-3 py-4  transition ">
                        <NavLink
                          className={"hover:text-black"}
                          to={`/user/${user.$id}`}
                        >
                          Profile
                        </NavLink>
                        <Logout />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mobile Profile menu */}
                <div className="flex md:hidden items-center gap-2">
                  <NavLink to={"/create-post"}>
                    <Button children={"Create Post"} btnType={"secondary"} />
                  </NavLink>
                  <div className="relative">
                    <button onClick={() => setisOpen(!open)} ref={menuRef}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold  cursor-pointer">
                        <div className="">{userName[0].toUpperCase()}</div>
                      </div>
                    </button>

                    <div
                      className={`fixed top-14 right-0 mt-2 w-56 rounded-2xl h-screen bg-gray-700 text-white font-semibold transition-all duration-300 shadow-xl border border-gray-200
                      ${
                        open
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="flex flex-col gap-4 items-center rounded-lg px-3 py-4  transition ">
                        {navLinks.map((link) =>
                          link.active ? (
                            <NavLink
                              key={link.name}
                              to={link.slug}
                              className={({ isActive }) =>
                                isActive
                                  ? "text-green-600 font-semibold"
                                  : "text-white hover:text-green-600"
                              }
                            >
                              <div>{link.name}</div>
                            </NavLink>
                          ) : null,
                        )}
                        <NavLink
                          className={"hover:text-black"}
                          to={`/user/${user.$id}`}
                        >
                          Profile
                        </NavLink>
                        <Logout />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-4">
                  <NavLink to={"/login"}>
                    <Button children={"Login"} btnType={"secondary"} />
                  </NavLink>
                  <NavLink to={"/signup"}>
                    <Button children={"Sign Up"} btnType={"primary"} />
                  </NavLink>
                </div>
                <div className="md:hidden">
                  <NavLink to={"/login"}>
                    <Button children={"Log in"} btnType={"primary"} />
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
