import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Manasa Mitra</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="relative px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="relative px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button
              variant="ghost"
              onClick={signOut}
              className="hover:underline hover:bg-blue-100 transition"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/signin")}
                className="hover:underline hover:bg-blue-100 transition"
              >
                Sign In
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/signin")}
                className="hover:underline hover:bg-blue-100 transition"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Menu"}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 hover:underline hover:bg-blue-100 rounded transition"
              >
                Contact
              </Link>
            </li>
            <li>
              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="w-full hover:underline hover:bg-blue-100 transition"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/signin");
                      setIsOpen(false);
                    }}
                    className="w-full mb-2 hover:underline hover:bg-blue-100 transition"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      navigate("/signin");
                      setIsOpen(false);
                    }}
                    className="w-full hover:underline hover:bg-blue-100 transition"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
