import React from "react";
import { Button, Container } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  // const authStatus = useSelector((state) => state.auth.status);

  // const navigate = useNavigate();

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
      // active: !authStatus,
      active: false,
    },
    {
      name: "Login",
      slug: "/login",
      // active: !authStatus,
      active: true,
    },
    {
      name: "Signup",
      slug: "/Signup",
      // active: !authStatus,
      active: true,
    },
  ];

  return (
    <div className="w-full bg-white">
      <Container>
        <div className=" flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">
              Blog<span className="text-green-800">App</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) =>
                link.active ? (
                  <NavLink key={link.name} to={link.slug}>
                    <div className="">{link.name}</div>
                  </NavLink>
                ) : null,
              )}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button children={"Write"} type={"secondary"} />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold">
              J
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
