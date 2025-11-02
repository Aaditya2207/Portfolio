"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { title: "About", path: "about" },
  { title: "Projects", path: "projects" },
  { title: "Contact", path: "contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setNavbarOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-95 border-b border-[#33353F] backdrop-blur-md">
      <div className="flex container items-center justify-between mx-auto px-4 py-3 md:py-4">
        {/* Logo */}
        <Link
          href=""
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide"
        >
          &lt;/AK&gt;
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleScroll(link.path)}
              className="text-white text-base lg:text-lg px-4 py-2 hover:text-blue-500 transition rounded-md"
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center gap-5 text-white z-50">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleScroll(link.path)}
              className="w-3/4 text-center py-3 text-lg sm:text-xl hover:text-blue-500 transition rounded-lg bg-[#1a1a1a]"
            >
              {link.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
