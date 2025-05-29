// src/components/layout/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const getLinkClassName = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-gray-900 text-white" // Active link style
        : "text-gray-300 hover:bg-gray-700 hover:text-white" // Inactive link style
    }`;

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Inner container for navbar content */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/home"
              className="flex-shrink-0 flex items-center text-white"
            >
              <span className="font-bold text-xl">BI Dashboard</span>{" "}
              {/* Changed name */}
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/home" className={getLinkClassName}>
                Home
              </NavLink>
              <NavLink to="/dashboard" className={getLinkClassName}>
                Dashboard
              </NavLink>
              <NavLink to="/data-mining-process" className={getLinkClassName}>
                {" "}
                Data Mining
              </NavLink>
              <NavLink to="/model" className={getLinkClassName}>
                {" "}
                {/* Placeholder */}
                Model
              </NavLink>
            </div>
          </div>
          {/* Mobile menu button (optional) - You'd need state and logic for this */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. Heroicon: menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. Heroicon: x */}
              {/* <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg> */}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state (optional) */}
      {/* <div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/home" className={getLinkClassName} aria-current="page">Home</NavLink>
                    <NavLink to="/dashboard" className={getLinkClassName}>Dashboard</NavLink>
                    <NavLink to="/model" className={getLinkClassName}>Model</NavLink>
                </div>
            </div> */}
    </nav>
  );
};

export default Navbar;
