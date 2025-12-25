"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Smooth scroll handler
  const handleSmoothScroll = (e, path) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(path);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setNavbarOpen(false);
        history.replaceState(null, "", path);
      }
    }
  };

  return (
    <>
      {/* Main Navbar - Always Visible */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#121212] border-b-2 border-[#33353F]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl md:text-4xl font-bold text-white tracking-wide z-10"
            >
              &lt;/AK&gt;
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a1a1a] border-2 border-[#33353F] text-white hover:bg-[#252525] transition-all z-10"
              aria-label="Toggle menu"
            >
              {navbarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  onClick={(e) => handleSmoothScroll(e, link.path)}
                  className="text-white hover:text-blue-400 transition text-lg"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navbarOpen && (
        <div className="fixed inset-0 top-16 md:top-20 z-[9998] md:hidden">
          {/* Dark Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={() => setNavbarOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 right-0 bg-[#1a1a1a] border-b-2 border-[#33353F] shadow-2xl">
            <div className="container mx-auto px-4 py-6">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    onClick={(e) => handleSmoothScroll(e, link.path)}
                    className="w-full py-4 px-6 text-xl font-semibold text-white bg-[#252525] hover:bg-[#33353F] rounded-lg border-2 border-[#33353F] hover:border-primary-500 transition-all duration-200 text-center"
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
