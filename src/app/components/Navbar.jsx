"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

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

  // ✅ Smooth scroll handler
  const handleSmoothScroll = (e, path) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(path);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setNavbarOpen(false);
        // Update the URL hash (optional)
        history.replaceState(null, "", path);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-100 border-b border-[#33353F] backdrop-blur-md">
      <div className="flex container items-center justify-between mx-auto px-4 py-3 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-4xl font-bold text-white tracking-wide"
        >
          &lt;/AK&gt;
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center justify-center p-2.5 rounded-lg bg-[#1a1a1a] border border-[#33353F] text-white hover:bg-[#252525] hover:border-[#4a4d5a] transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
          >
            {!navbarOpen ? (
              <Bars3Icon className="h-6 w-6" />
            ) : (
              <XMarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              onClick={(e) => handleSmoothScroll(e, link.path)}
              className="text-white hover:text-blue-400 transition"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {navbarOpen && (
        <>
          {/* Backdrop with animation */}
          <div 
            className="fixed inset-0 top-[64px] bg-[#121212] bg-opacity-98 backdrop-blur-lg z-40 animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setNavbarOpen(false)}
          />
          
          {/* Menu Content with slide-in animation */}
          <div className="fixed inset-0 top-[64px] flex flex-col z-50 overflow-y-auto animate-[slideDown_0.3s_ease-out]">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 py-12">
              {/* Close Button */}
              <button
                onClick={() => setNavbarOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#33353F] hover:bg-[#4a4d5a] text-white transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-3 w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    onClick={(e) => handleSmoothScroll(e, link.path)}
                    className="w-full text-center py-4 px-6 text-xl font-semibold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-400 hover:to-secondary-600 transition-all duration-300 rounded-xl hover:bg-[#1a1a1a] border border-transparent hover:border-[#33353F] relative group active:scale-95"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="relative z-10">{link.title}</span>
                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </a>
                ))}
              </nav>

              {/* Decorative Element */}
              <div className="mt-12 pt-8 border-t border-[#33353F] w-full max-w-sm">
                <p className="text-center text-[#ADB7BE] text-sm font-medium">
                  Navigate to sections
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
