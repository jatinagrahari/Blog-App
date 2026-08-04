import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../index";
import { useSelector } from "react-redux";

const Footer = () => {
  const authStatus = useSelector((state) => state.auth.status);

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
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
  ];

  return (
    <div>
      <Container>
        <div className=" py-12">
          <div className="grid gap-20 md:grid-cols-3">
            {/* Logo & Description */}
            <div>
              <h2 className="mb-3 text-2xl font-bold">
                Blog<span className="text-green-700">App</span>
              </h2>

              <p className="text-sm leading-6 text-gray-600">
                A modern blogging platform where ideas, stories, and knowledge
                come together.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

              <ul className="space-y-2 text-gray-600">
                {navLinks.map((link) =>
                  link.active ? (
                    <NavLink key={link.name} to={link.slug}>
                      <li>{link.name}</li>
                    </NavLink>
                  ) : null,
                )}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>

              <ul className="space-y-2 text-gray-600">
                <a href="https://github.com/jatinagrahari" target="_blank">
                  <li>GitHub</li>
                </a>
                <a href="https://linkedin.com/in/jatinagrahari" target="_blank">
                  <li>LinkedIn</li>
                </a>
                <a href="https://jatinagrahari.com" target="_blank">
                  <li>Portfolio</li>
                </a>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 border-black/20 border-t pt-6 text-center text-sm text-gray-500">
            © 2026 BlogApp. Built with ❤️ by Jatin Agrahari.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
