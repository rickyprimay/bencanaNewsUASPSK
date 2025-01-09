import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const avatar = user ? user.avatar : "";

  return (
    <>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <Link to="/" className="btn btn-ghost normal-case text-xl">
            BenKir News
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {localStorage.getItem("token") ? (
            <div>
              <div className="relative">
                <label
                  tabIndex="0"
                  className="btn btn-ghost flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={
                      avatar ||
                      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </label>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 p-2 bg-white shadow-lg rounded-md space-y-2">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-gray-700">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="btn btn-outline btn-accent">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-accent">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="btn btn-ghost absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        <ul className="menu p-4">
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
