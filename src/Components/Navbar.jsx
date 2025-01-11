import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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
  const username = user ? user.name : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-teal-300 text-teal-900"
      : "hover:bg-teal-200 hover:text-teal-900";

  const isDashboard = location.pathname === "/dashboard" || location.pathname.startsWith("/dashboard/");
  
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg p-4">
        <div className="navbar-start">
          {!isDashboard && (
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
          )}

          {!isDashboard && (
            <Link to="/" className="btn btn-ghost normal-case text-xl text-teal-600 font-semibold">
              BenKir News
            </Link>
          )}
        </div>

        <div className="navbar-center hidden lg:flex">
          {!isDashboard && (
            <ul className="menu menu-horizontal p-0 space-x-4">
              <li>
                <Link to="/" className={`${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`${isActive("/about")}`}>
                  About
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="navbar-end flex items-center space-x-4">
          {localStorage.getItem("token") ? (
            <div className="relative">
              <label
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
                {!isDashboard && username && <span className="ml-2">{username}</span>}
              </label>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 shadow-lg rounded-lg bg-white border border-teal-200 z-50"
                >
                  <ul className="space-y-2 py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-800"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-gray-800 hover:bg-teal-100 hover:text-teal-800 text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          className="btn btn-ghost absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        <ul className="menu p-4 space-y-2">
          <li>
            <Link to="/" onClick={toggleSidebar} className={`${isActive("/")}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar} className={`${isActive("/about")}`}>
              About
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
