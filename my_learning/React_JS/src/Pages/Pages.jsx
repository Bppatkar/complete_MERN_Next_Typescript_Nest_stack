import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import React from "react";
import About from "./About";
import Contact from "./Contact";
import SignUp from "./SignUp";

const Pages = () => {
  return (
    <BrowserRouter>
      <h1 className="text-2xl font-bold text-center mb-4">
        Pages [React_Router_DOM]
      </h1>
      <nav className="flex justify-center mb-4">
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium" // Blue for About
                  : "text-gray-500 hover:text-blue-500 transition duration-300"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium" // Green for Contact
                  : "text-gray-500 hover:text-green-500 transition duration-300"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-medium" // Purple for Sign Up
                  : "text-gray-500 hover:text-purple-500 transition duration-300"
              }
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
